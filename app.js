const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  res.send('reqeust was handled');
});

app.listen(3300, () => {
  console.log('express server listening on port 3300!');
});

const { MongoClient } = mongodb;
MongoClient.connect('mongodb://localhost:27017/todo-app'), (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  const todos = db.collection('todos').find();
  console.log(todos);
}
