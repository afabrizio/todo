module.exports = function routes(db) {
  const todosCollection = db.collection('todos');
  const router = require('express').Router();
  const {ObjectId} = require('mongodb');

  router.get('/todos', (req, res) => {
    todosCollection.find({}).toArray( (err, documents) => {
      res.json(documents);
    });
  });

  router.post('/todos', (req, res) => {
    todosCollection.insertOne(req.body, (err, result) => {
      if(err) return res.sendStatus(500);
      const doc = result.ops[0] //ops property is an array of the affected documents
      res.json(doc);
    });
  });

  router.put('/todos/:todoId', (req, res) => {
    let _id
    try {
      _id = ObjectId(req.params.todoId)
    }
    catch (err) {
      return res.sendStatus(500)
    }
    todosCollection.updateOne(
      {_id: _id},
      {$set: {complete: !req.body.complete}},
      (error) => {
        if(error) return res.sendStatus(500);
        todosCollection.findOne({_id}, (err, doc) => {
          if(err) return res.sendStatus(500);
          res.json(doc);
        })
      }
    )
  })

  return router;
}
