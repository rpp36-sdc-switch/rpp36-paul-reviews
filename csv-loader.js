// For loading the csv files into db.

var db = require('./db/mongo');
var papa = require('papaparse');
var fs = require('fs');
var path = require('path');

var reviewsFile = path.resolve(__dirname, '../reviews.csv');
var photosFile = path.resolve(__dirname, '../reviews_photos.csv');
var charRevFile = path.resolve(__dirname, '../characteristic_reviews.csv');
var characteristicsFile = path.resolve(__dirname, '../characteristics.csv');
var logStep = 200000;

var addReviews = (file, cb) => {
  var count = 0;
  var lastLog = 0;
  var readStream = fs.createReadStream(file);
  papa.parse(readStream, {
    header: true,
    dynamicTyping: true,
    chunk: (chunk) => {
      if (chunk.errors.length) {
        console.log(chunk.errors);
      }
      chunk.data = chunk.data.map(item => {
        if (item.response === 'null') {
          item.response = null;
        }
        item.review_id = item.id;
        delete item.id;
        return item;
      });
      count += chunk.data.length;
      if (count > lastLog + logStep) {
        console.log(count);
        lastLog = count;
      }
      db.Review.insertMany(chunk.data, (errors) => {
        errors && console.log(errors);
      });
    },
    complete: cb
  });
};

var addPhotos = (file, cb) => {
  var count = 0;
  var lastLog = 0;
  var readStream = fs.createReadStream(file);
  papa.parse(readStream, {
    header: true,
    dynamicTyping: true,
    chunk: (chunk) => {
      chunk.data = chunk.data.map(item => {
        return {
          updateOne: {
            filter: {review_id: item.review_id},
            update: {
              $push: {
                photos: {
                  id: item.id,
                  url: item.url
                }
              }
            }
          }
        };
      });
      count += chunk.data.length;
      if (count > lastLog + logStep) {
        console.log(count);
        lastLog = count;
      }
      db.Review.bulkWrite(chunk.data);
    },
    complete: cb
  });
};

var addCharRev = (file, cb) => {
  var count = 0;
  var lastLog = 0;
  var readStream = fs.createReadStream(file);
  papa.parse(readStream, {
    header: true,
    dynamicTyping: true,
    chunk: (chunk) => {
      count += chunk.data.length;
      if (count > lastLog + logStep) {
        console.log(count);
        lastLog = count;
      }
      db.Characteristic.insertMany(chunk.data);
    },
    complete: cb
  });
};

var addCharacteristics = (file, cb) => {
  var count = 0;
  var lastLog = 0;
  var readStream = fs.createReadStream(file);
  papa.parse(readStream, {
    header: true,
    dynamicTyping: true,
    chunk: (chunk) => {
      chunk.data = chunk.data.map(item => {
        return {
          updateMany: {
            filter: { characteristic_id: item.id },
            update: {
              name: item.name,
              product_id: item.product_id
            }
          }
        };
      });
      count += chunk.data.length;
      if (count > lastLog + logStep) {
        console.log(count);
        lastLog = count;
      }
      db.Characteristic.bulkWrite(chunk.data);
    },
    complete: cb
  });
};

var joinCharRev = (cb) => {
  var count = 0;
  var lastCount = 0;

  var join = async (skip = 0, limit = 2000) => {
    var reviews = await db.Review.aggregate([{
      $skip: skip * limit
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'characteristics',
        localField: 'review_id',
        foreignField: 'review_id',
        as: 'characteristics'
      }
    }
    ]);
    if (!reviews || reviews.length === 0) {
      return;
    } else {
      count = count + reviews.length;
      if (count > lastCount + logStep) {
        console.log(count);
        lastCount = count;
      }
    }
    reviews = reviews.map(review => {
      var characteristics = {};
      review.characteristics.forEach(char => {
        characteristics[char.name] = char.value;
      });
      var update = {};
      for (var char in characteristics) {
        var key = 'characteristics.' + char;
        update[key] = characteristics[char];
      }
      return {
        updateOne: {
          filter: { review_id: review.review_id }, update
        }
      };
    });
    var write = await db.Review.bulkWrite(reviews);
    join(skip + 1, limit);
  };

  join();
  cb();
};

console.log('######## Loading Reviews ########');
addReviews(reviewsFile, () => {
  console.log('######## Loading Reviews Complete ########');
  console.log('######## Loading Photos #######');
  addPhotos(photosFile, () => {
    console.log('######## Loading Photos Complete ########');
    console.log('######## Loading Characteristics_Reviews #######');
    addCharRev(charRevFile, () => {
      console.log('######## Loading Characteristics_Reviews Complete ########');
      console.log('######## Loading Characteristics #######');
      addCharacteristics(characteristicsFile, () => {
        console.log('######## Loading Characteristics Complete');
        joinCharRev(() => {
          console.log('######## Done ########');
        });
      });
    });
  });
});