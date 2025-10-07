const mongoose = require("mongoose");

// const Review = mongoose.model(
//   "Review",
//   new mongoose.Schema({
//     title: String,
//     bookid: String,
//     rating: Number,
//     comment: String
//   })
// );

const reviewSchema = new mongoose.Schema({
  title: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // This creates a relationship with the 'Book' model
    required: true,
  },
  rating: Number,
  comment: String
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;