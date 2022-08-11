var db = require('../db');

exports.reviews = async (req, res) => {
  try {
    var reviews = await db.getReviews(req.params);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};