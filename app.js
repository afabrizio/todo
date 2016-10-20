const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.static('public'));

app.get('/todos', (req, res) => {
  getTasks(res);
});

app.listen(3300, () => {
  console.log('express server listening on port 3300!');
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
