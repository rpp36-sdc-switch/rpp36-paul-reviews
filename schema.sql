CREATE DATABASE ratingsAndReviews;

USE ratingsAndReviews;

CREATE TABLE Review (
  review_id: INT,
  rating: INT,
  summargy: TEXT,
  recommend: BOOLEAN,
  response: INT,
  body: TEXT,
  date: DATE,
  reviewer_name: TEXT,
  helpfulness: INT,
);

CREATE TABLE Photo (
  reviewId: INT
  id: INT,
  url: TEXT
);



CREATE TABLE Ratings (
  productId: INT,
  `1`: INT,
  `2`: INT,
  `3`: INT,
  `4`: INT,
  `5`: INT
);

CREATE TABLE Recommended (
  true: INT,
  false: INT
);

CREATE TABLE characteristics (
  Fit: INT,
  Length: INT,
  Comfort: INT,
  Quality: INT
);

CREATE Table Fit (
  id: INT,
  value: DECIMAL
);

CREATE TABLE Length (
  id: INT,
  value: DECIMAL
);

CREATE TABLE Comfort (
  id: INT,
  value: DECIMAL
);

CREATE TABLE Quality (
  id: INT,
  value: DECIMAL
);