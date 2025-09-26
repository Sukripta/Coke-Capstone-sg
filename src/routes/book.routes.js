const controller = require("../controllers/book.controller");
const { body, validationResult } = require('express-validator');
const { title, author, genre, year, description, published } = require("../validation-rules/book.validation");

const validate = validations => {
  return async (req, res, next) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }
    next();
  };
};

module.exports = function(app) {

    app.post("/api/books", validate([title, author, genre, year, published, description]), controller.add); //public route
    app.get("/api/books", controller.findAll);
    app.put("/api/books/:id", validate([title, author, genre, year, published, description]), controller.update);
}