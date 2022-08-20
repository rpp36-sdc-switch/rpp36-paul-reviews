const db = require('./mongo.js');

var MetaObj = function() {
  this.ratings = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0
  };
  this.recommended = {
    true: 0,
    false: 0
  };
  this.characteristics = {};
};

exports.getReviews = (query) => {
  var product_id = query.product_id;
  var page = query.page || 0;
  var limit = query.count || 5;
  return db.Review.find({product_id, reported: false}, {_id: false, __v: false}, { sort: {helpfulness: -1}, skip: page * limit, limit})
    .then(results => {
      return {
        product: product_id,
        page,
        count: limit,
        results
      };
    });
};

exports.getMeta = async (query) => {
  return db.Review.find(query)
    .then(reviews => {
      var meta = new MetaObj();
      reviews.forEach(review => {
        meta.ratings[review.rating]++;
        meta.recommended[review.recommend]++;
        var chars = Object.keys(review.characteristics);
        chars.forEach(char => {
          var reviewChar = review.characteristics;
          var metaChar = meta.characteristics;
          if (reviewChar[char]) {
            if (metaChar[char]) {
              metaChar[char].count++;
              metaChar[char].total += reviewChar[char];
            } else {
              metaChar[char] = {};
              metaChar[char].count = 1;
              metaChar[char].total = reviewChar[char];
            }
          }
        });
      });
      for (var char in meta.characteristics) {
        var characteristic = meta.characteristics[char];
        characteristic.value = characteristic.total / characteristic.count;
        characteristic.id = char;
        delete characteristic.count;
        delete characteristic.total;
      }
      meta.product_id = query.product_id;
      return meta;
    });
};

exports.addReview = (data) => {
  data.reviewer_name = data.name;
  data.review_email = data.email;
  data.photos = data.photos.map(photo => {
    return {
      url: photo
    };
  });
  return db.Review.find({}, null, { sort: { review_id: -1}, limit: 1})
    .then(lastRev => {
      data.review_id = lastRev[0].review_id + 1;
      var review = new db.Review(data);
      return review.save();
    });
};

exports.markHelpful = (query) => {
  return db.Review.updateOne(query, {
    $inc: {
      helpfulness: 1
    }
  });
};

exports.report = (query) => {
  return db.Review.updateOne(query, {
    $set: {
      reported: true
    }
  });
};