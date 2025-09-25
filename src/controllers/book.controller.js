const { checkDuplicateName } = require("../utils/duplicateVal");
const Book = require("../models/book.model");

exports.add = async (request, response) => {
  const title = request.body.title.toUpperCase();
  try {
    if (!(title.trim() || request.body.author.trim() || request.body.genre.trim() || request.body.year.trim() || request.body.description.trim())) {
      response.status(400).send({ message: "Content cannot be empty" });
      return;
    }

    const isDuplicateTitle = await checkDuplicateName(title);
    if (!isDuplicateTitle.length) {
      const book = new Book({
        title: title,
        author: request.body.author,
        genre: request.body.genre,
        year: request.body.year,
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

exports.findAll = async (request,response) => {
  try {
    const data = await Book.find({});
    response.status(200).send(data);
  } catch (err) {
    response.status(500).send({
      message: err.message || "Error occurred while retrieving books."
    });
  }
};