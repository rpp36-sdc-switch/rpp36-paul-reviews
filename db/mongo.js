var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rnr');

var reviewSchema = new mongoose.Schema({
  review_id: {type: Number, required: true, index: true},
  product_id: {type: Number, required: true, index: true},
  rating: Number,
  date: {type: Date, default: Date.now},
  summary: String,
  body: String,
  recommend: Boolean,
  reported: {type: Boolean, default: false},
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: {type: Number, default: 0},
  photos: [{
    id: Number,
    url: String
  }],
  characteristics: {
    Quality: Number,
    Fit: Number,
    Comfort: Number,
    Length: Number,
    Size: Number,
    Width: Number
  }
});

var characteristicScema = new mongoose.Schema({
  characteristic_id: {type: Number, index: true, default: null},
  product_id: {type: Number, index: true},
  review_id: { type: Number, required: true, index: true},
  name: String,
  value: Number
});

exports.Review = mongoose.model('Review', reviewSchema);
exports.Characteristic = mongoose.model('Characteristic', characteristicScema);

