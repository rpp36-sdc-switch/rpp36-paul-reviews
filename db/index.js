const db = require('./mongo.js');

exports.addReview = (data) => {
  var review = new db.Review(data);
  return review.save();
};

exports.addPhoto = (data) => {
  var photo = new db.Photo(data);
  return photo.save();
};

exports.getReviews = (query) => {
  return db.Review.find(query);
};

exports.getPhotos = (reviewId) => {
  return db.Photo.find({ reviewId });
};

exports.addBulkReviews = (data) => {
  return db.Review.insertMany(data);
};

exports.addBulkCharReviews = (data) => {
  return db.CharRev.insertMany(data);
};

exports.addBulkCharacteristics = (data) => {
  return db.Characteristics.insertMany(data);
};

exports.addBulkPhotos = (data) => {
  return db.Photo.insertMany(data);
};