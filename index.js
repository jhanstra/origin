#!/usr/bin/env node --harmony
'use strict'

const origin = require('commander')

origin.version('0.0.1')

const create = require('./commands/create')

origin
  .command('new')
  .description('set up a new project from a template')
  .action((req, opt) => {
    create()
  })

origin.parse(process.argv)