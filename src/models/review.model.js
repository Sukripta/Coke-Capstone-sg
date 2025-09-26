const mongoose = require("mongoose");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    title: String,
    bookid: String,
    rating: Number,
    comment: String
  })
);

module.exports = Review;