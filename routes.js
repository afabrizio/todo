module.exports = function routes(db) {

  const router = require('express').Router();

  router.get('/todos', (req, res) => {
    db.collection('todos').find({}).toArray( (err, documents) => {
      res.json(documents);
    });
  });

  router.post('/todos', (req, res) => {
    db.collection('todos').insertOne(req.body, (err, result) => {
      if(err) return res.sendStatus(500);
      const doc = result.ops[0] //ops property is an array of the affected documents
      res.json(doc);
    });
  });

  return router;
}
