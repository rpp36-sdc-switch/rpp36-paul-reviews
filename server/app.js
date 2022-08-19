const express = require('express');
const morgan = require('morgan');
const routes = require('../routes');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/reviews', routes.reviews);
app.get('/reviews/meta', routes.meta);
app.post('/reviews', routes.addReview);
app.put('/reviews/:review_id/helpful', routes.helpful);
app.put('/reviews/:review_id/report', routes.report);


module.exports = app;