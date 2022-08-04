const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect('mongodb://localhost/ratingsAndReviews');

const reviewSchema = Schema({
  product_id: { type: Number, unique: true, required: true },
  review_id: { type: Number, unique: true, required: true },
  rating: { type: Number, min: 0, max: 5 },
  summary: String,
  recommend: Boolean,
  response: Number,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [
    {
      id: { type: Number, required: true },
      url: String
    }
  ]
});

const metaSchema = Schema({
  product_id: { type: Number, required: true },
  ratings: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  },
  recommend: {
    false: { type: Number, default: 0 },
    true: { type: Number, default: 0 }
  },
  characteristics: {
    Fit: {
      id: { type: Number, required: true },
      value: Schema.Types.Decimal128
    },
    Length: {
      id: { type: Number, required: true },
      value: Schema.Types.Decimal128
    },
    Comfort: {
      id: { type: Number, required: true },
      value: Schema.Types.Decimal128
    },
    Quality: {
      id: { type: Number, required: true },
      value: Schema.Types.Decimal128
    }
  }
});

const Review = model('Review', reviewSchema);
const Meta = model('Meta', metaSchema);