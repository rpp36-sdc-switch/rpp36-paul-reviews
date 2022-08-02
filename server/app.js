const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.get('/reviews', (req, res) => {
  res.json({
    test: "Test"
  });
});

module.exports = app;