const express = require('express');
const routes = require('./routes.js');
const bodyParser = require('body-parser');    
const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo-app', (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  express()
    .use( express.static('public') )
    .use( bodyParser.json() )
    .use( routes(db) )
    .listen(3300, () => {
      console.log('express server listening on port 3300!');
    });
});
