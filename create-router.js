const { MongoClient } = require('mongodb');

module.exports = function createRouter() {
  router = require('express').Router();

  router.get('/todos', (req, res) => {
    getTasks(res);
  });

  function getTasks(res) {
    MongoClient.connect('mongodb://localhost:27017/todo-app', (err, db) => {
      if(err) {
        console.error(err);
        process.exit(1);
      }

      db.collection('todos').find({}).toArray( (err, documents) => {
        db.close();
        res.json(documents);
      });
    });
  }
  return router;
}
