var db = require('../db');

exports.reviews = async (req, res) => {
  try {
    var reviews = [];
    if (req.query.product_id) {
      reviews = await db.getReviews(req.query);
    }
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.meta = async (req, res) => {
  try {
    var meta = await db.getMeta(req.query);
    res.json(meta);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.addReview = async (req, res) => {
  try {
    await db.addReview(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.helpful = async (req, res) => {
  console.log(req.params);
  try {
    await db.markHelpful(req.params);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.report = async (req, res) => {
  try {
    await db.report(req.params);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};