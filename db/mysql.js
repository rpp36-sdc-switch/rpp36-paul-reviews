require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
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