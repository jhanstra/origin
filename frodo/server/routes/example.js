import { ObjectId } from 'mongodb'

const exampleApi = (app, db) => {
  const example = db.collection('example')

  app.get('/example/:id', (req, res) => {
    const id = { _id: new ObjectId(req.params.id) }
    examples.findOne(id, (err, item) => {
      if (err) { res.send({ 'error': 'an error occurred' }) }
      else { res.send(item) }
    })
  })

  app.post('/example', (req, res) => {
    const exampleJson = {
      title: req.body.title,
      body: req.body.body,
    }
    examples.insert(exampleJson, (err, result) => {
      if (err) { res.send({ 'error': 'an error occurred' }) }
      else { res.send(result.ops[0]) }
    })
  })

  app.delete('/example/:id', (req, res) => {
    const _id = { '_id': new ObjectID(req.params.id) }
    examples.remove(id, (err, item) => {
      if (err) { res.send({ 'error': 'an error has occurred' }) }
      else { res.send(`example ${id} deleted`) }
    })
  })

  app.put('/example/:id', (req, res) => {
    const id = { '_id': new ObjectID(req.params.id) }
    const exampleJson = {
      body: req.body.body,
      title: req.body.title
    }
    examples.update(id, example, (err, result) => {
      if (err) { res.send({ 'error': 'an error has occurred' }) }
      else { res.send(example) }
    })
  })
}

export {
  exampleApi
}