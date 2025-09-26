const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String, 
    author: String, 
    genre: String, 
    year: Number,
    published: Date,
    description: String
  })
);

module.exports = Book;