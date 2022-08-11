var papa = require('papaparse');
var fs = require('fs');
var db = require('./db');
var path = require('path');

var files = [
  {
    name: 'Reviews',
    path: path.resolve('../reviews.csv'),
    store: db.addBulkReviews
  },
  {
    name: 'Characteristics_Reviews',
    path: path.resolve('../characteristic_reviews.csv'),
    store: db.addBulkCharReviews
  },
  {
    name: 'Characteristics',
    path: path.resolve('../characteristics.csv'),
    store: db.addBulkCharacteristics
  },
  {
    name: 'Photos',
    path: path.resolve('../reviews_photos.csv'),
    store: db.addBulkPhotos
  }
];

var DBLoad = (file, cb) => {
  var readStream = fs.createReadStream(file.path, { highWaterMark: 32 * 1024 });

  papa.parse(readStream, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    beforeFirstChunk: () => {
      console.log('##### Transferring ' + file.name + ' #####');
    },
    transform: function(value) {
      return value === 'null' ? null : value;
    },
    error: function(err) {
      console.log(err);
    },
    chunk: function(result, parser) {
      if (result.errors.length) {
        console.log(result.errors);
      }
      file.store(result.data);
    },
    complete: function() {
      console.log('##### ' + file.name + ' transfer complete #####');
      cb();
    }
  });
};

DBLoad(files[0], () => {
  DBLoad(files[1], () => {
    DBLoad(files[2], () => {
      DBLoad(files[3], () => {
        console.log('**************ALL FILES TRANSFERRED*****************');
      });
    });
  });
});