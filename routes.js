module.exports = function routes(db) {

  const router = require('express').Router();

  router.get('/todos', (req, res) => {
    getTasks(res, db);
  });

  router.post('/todos', (req, res) => {

  });

  function getTasks(res, db) {
    db.collection('todos').find({}).toArray( (err, documents) => {
      db.close();
      res.json(documents);
    });
  }

  return router;
}
