const express = require('express');
const createRouter = require('./create-router.js');

express()
  .use( express.static('public') )
  .use( createRouter() )
  .listen(3300, () => {
    console.log('express server listening on port 3300!');
  });
