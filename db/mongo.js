const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect('mongodb://localhost/ratingsAndReviews');

const reviewSchema = Schema({
  review_id: { type: Number, unique: true, required: true},
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: Number,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [
    {
      id: { type: Number },
      url: String
    }
  ]
});

const metaSchema = Schema({
  product_id: Number,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  recommend: {
    false: Number,
    true: Number
  },
  characteristics: {
    Fit: {
      id: Number,
      value: Schema.Types.Decimal128
    },
    Length: {
      id: Number,
      value: Schema.Types.Decimal128
    },
    Comfort: {
      id: Number,
      value: Schema.Types.Decimal128
    },
    Quality: {
      id: Number,
      value: Schema.Types.Decimal128
    }
  }
});

const Review = model('Review', reviewSchema);
const Meta = model('Meta', metaSchema);