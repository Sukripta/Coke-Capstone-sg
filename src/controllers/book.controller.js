const { checkDuplicateName } = require("../utils/duplicateVal");
const Book = require("../models/book.model");

exports.add = async (req, res) => {
  const name = req.body.title.toUpperCase();
  try {
    if (!(name.trim() || req.body.author || req.body.genre || req.body.year || req.body.description)) {
      res.status(400).send({ message: "Content cannot be empty" });
      return;
    }

    const isDuplicateTitle = await checkDuplicateName(name);
    if (!isDuplicateTitle.length) {
      const book = new Book({
        title: name,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        description: req.body.description
      });
      const data = await book.save(book);
      res.status(201).send(data);

    } else {
      res.status(409).send({ message: "Title already exists" });
    }


  } catch (error) {
    console.log("Error ", error);
  }

};

exports.findAll = async (req, res) => {
  try {
    // const name1 = req.body.title;
    const name = req.query.title;
    const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    const data = await Book.find(condition);

    res.status(200).send(data);

  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving books."
    });
  }
};