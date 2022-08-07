CREATE DATABASE ratingsAndReviews;

USE ratingsAndReviews;

CREATE TABLE Review (
  productId int NOT NULL,
  review_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
  summary TEXT,
  recommend BOOLEAN,
  response INT,
  body TEXT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  reviewer_name TEXT NOT NULL,
  helpfulness INT,
  PRIMARY KEY (review_id)
);

CREATE TABLE Photo (
  reviewId INT,
  id INT NOT NULL,
  url TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (reviewId) REFERENCES Review(review_id)
);


CREATE TABLE Ratings (
  productId INT UNIQUE NOT NULL,
  `1` INT NOT NULL DEFAULT 0,
  `2` INT NOT NULL DEFAULT 0,
  `3` INT NOT NULL DEFAULT 0,
  `4` INT NOT NULL DEFAULT 0,
  `5` INT NOT NULL DEFAULT 0
);

CREATE TABLE Recommended (
  productId INT NOT NULL,
  `true` INT DEFAULT 0,
  `false` INT DEFAULT 0
);

CREATE TABLE Characteristics (
  productId INT UNIQUE NOT NULL,
  Size FLOAT,
  Width FLOAT,
  Fit FLOAT,
  Length FLOAT,
  Comfort FLOAT,
  Quality FLOAT
);