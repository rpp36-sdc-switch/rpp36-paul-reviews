const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect('mongodb://localhost/ratingsAndReviews')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const reviewSchema = Schema({
  id: { type: Number, unique: true, required: true },
  product_id: { type: Number, required: true, index: true },
  rating: { type: Number, min: 0, max: 5 },
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number
});

const photoSchema = Schema({
  id: { type: Number, required: true },
  review_id: { type: Number, required: true, index: true },
  url: String
});

const characteristicsReviewsSchema = Schema({
  id: {type: Number, required: true},
  characteristic_id: {type: Number, required: true, index: true},
  review_id: {type: Number, required: true, index: true},
  value: Number
});

const characteristicsSchema = Schema({
  id: {type: Number, required: true},
  product_id: {type: Number, required: true, index: true},
  name: String
});

exports.Review = model('Review', reviewSchema);
exports.Photo = model('Photo', photoSchema);
exports.CharRev = model('Characteristics_Reviews', characteristicsReviewsSchema);
exports.Characteristics = model('Characteristics', characteristicsSchema);

