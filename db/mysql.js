const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ratingsAndReviews'
});

con.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to Database');
  }
});

module.exports = con;