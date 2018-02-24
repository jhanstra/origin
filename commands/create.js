const fs = require('fs-extra')
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const write = require('write')
const replace = require('replace')

const create = () => {
  const project = {}

  co(function *() {
    console.log(chalk.white("Let's set up your new project"))

    // Get infomration about the project
    if (process.argv.slice(3)[0]) {
      project.template = process.argv.slice(3)[0]
    } else {
      project.template = yield prompt('choose a template: ')
    }
    if (process.argv.slice(4)[0]) {
      project.name = process.argv.slice(4)[0]
    } else {
      project.name = yield prompt('project name: ')
    }
    project.version = yield prompt('version: ')
    project.description = yield prompt('description: ')
    project.keywords = yield prompt('keywords: ')
    project.author = yield prompt('author: ')

    // Make new project directory and copy template code into it
    console.log(chalk.green('🚀  Setting up your shiny new project'))
    fs.mkdirpSync(project.name)
    const templatePath = __dirname.replace('commands', project.template)
    fs.copySync(templatePath, project.name)
    console.log(chalk.green(`🛠️  Project template created for ${project.name}`))

    process.chdir(project.name)

    // Go through code, swap out origin instances
    for (let prop in project) {
      replace({
        regex: `origin--${prop}`,
        replacement: project[prop],
        paths: ['.'],
        recursive: true,
        silent: true,
      })
    }

    // Run npm install
    console.log(chalk.green("📦  Running 'npm install' for you"))
    exec('npm install', (err, stdout, stderr) => {
      if (err) { console.error(err) }
    })

    // Set up mLab database
    console.log(chalk.green("📁  Take a minute to create an mLab database and get your mongodb uri"))
    project.databaseUrl = 'n'
    do {
      project.databaseUrl = yield prompt('done? paste here: ')
    } while (!project.databaseUrl.includes('mongodb://') && project.databaseUrl.includes('<dbuser>'))


    // Take care of git setup
    console.log(chalk.green("💾  Running 'git init' for you"))
    exec('git init', (err, stdout, stderr) => {
      if (err) { console.error(err) }
      else {
        exec('git add -A', (err, stdout, stderr) => {
          if (err) { console.error(err) }
          else {
            exec('git commit -m "first commit"', (err, stdout, stderr) => {
              if (err) { console.error(err) }
            })
          }
        })
      }
    })


    console.log(chalk.green("🖱️  Take a minute to create a github repo with the same name (copied to clipboard)"))
    exec('open https://github.com/new', (err, stdout, stderr) => {
      if (err) { console.error(err) }
    })
    let githubRepoCreated = 'n'
    while (githubRepoCreated === 'n' || githubRepoCreated === 'no') {
      githubRepoCreated = yield prompt('done? ')
    }

    console.log(chalk.green("🤖  Adding remote repository and pushing first commit"))
    exec(`git remote add origin https://github.com/jhanstra/${project.name}`, (err, stdout, stderr) => {
      if (err) { console.error(err) }
      else {
        exec(`git push origin master`, (err, stdout, stderr) => {
          if (err) { console.error(err) }
        })
      }
    })

    console.log(chalk.green("👨‍💻  Opening VSCode"))
    exec(`code .`, (err, stdout, stderr) => {
      if (err) { console.error(err) }
    })

    console.log(chalk.green("✅  Done! Use 'npm start server' and 'npm start client' to run the app"))
    exec(`npm run start-server`, (err, stdout, stderr) => {
      if (err) { console.error(err) }
    })
  })
}

module.exports = create