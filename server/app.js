const express = require('express');
const morgan = require('morgan');
const routes = require('../routes');

const app = express();

app.use(morgan('tiny'));

//routes
app.get('/reviews/:product_id', routes.reviews);

module.exports = app;