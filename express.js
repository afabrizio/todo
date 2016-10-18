const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(3300, () => {
  console.log('express server listening on port 3300!');
});
