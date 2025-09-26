const { checkDuplicateName } = require("../utils/duplicateVal");
const Book = require("../models/book.model");
const Review = require("../models/review.model");

exports.add = async (request, response) => {
  const title = request.body.title.toUpperCase();
  try {
    const isDuplicateTitle = await checkDuplicateName(title);
    if (!isDuplicateTitle.length) {
      const book = new Book({
        title: title,
        author: request.body.author,
        genre: request.body.genre,
        year: request.body.year,
        published: request.body.published,
        description: request.body.description
      });
      const data = await book.save(book);
      response.status(201).send(data);

    } else {
      response.status(409).send({ message: "Title already exists" });
    }


  } catch (error) {
    console.log("Error ", error);
  }

};

exports.findAll = async (request, response) => {
  try {
    const data = await Book.find({});
    response.status(200).send(data);
  } catch (err) {
    console.error("Error: ", err);
    response.status(500).send({
      message: "Error occurred while retrieving books."
    });
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;
  const { title, author, genre, year, description, published } = request.body;

  try {
    let newTitle = title ? title.toUpperCase() : undefined;
    if (newTitle) {
      const isDuplicateTitle = await checkDuplicateName(newTitle);
      if (isDuplicateTitle.length) {
        return response.status(409).send({ message: "Title already exists." });
      }
    }

    const newBook = {};
    newBook.title = newTitle;
    newBook.author = author;
    newBook.genre = genre;
    newBook.year = year;
    newBook.published = published;
    newBook.description = description;

    // Find the book by ID
    const updatedBook = await Book.findByIdAndUpdate(id, newBook, { new: true, runValidators: true });
    if (!updatedBook) {
      return response.status(404).send({ message: `Cannot update book with id=${id}. Book not found.` });
    } else {
      response.status(200).send(updatedBook);
    }
  } catch (err) {
    console.error("Error during update operation:", err);
    response.status(500).send({ message: "Error updating book" });
  }
};

exports.delete = async (request, response) => {
  try {
    const id = request.params.id;
    const data = await Book.findByIdAndDelete(id);

    if (!data) {
      return response.status(404).send({
        message: `Cannot delete Book with id=${id}`,
      });
    }

    response.status(200).send({
      message: "Book was deleted successfully!",
    });

  } catch (err) {
    response.status(500).send({
      message: "Could not delete Book with id=" + request.params.id,
    });
  }
};

exports.addReview = async (request, response) => {
  try {
    const bookId = request.params.id;
    const { rating, comment } = request.body;
    const book = await Book.findById(bookId);

    const bookReview = new Review({
      title: book.title,
      bookid: bookId,
      rating: rating,
      comment: comment
    });
    const data = await bookReview.save(bookReview);
    response.status(201).send(data);
  } catch (err) {
    response.status(500).send({
      message: err.message || "Something went wrong"
    });
  }
};