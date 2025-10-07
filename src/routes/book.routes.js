const controller = require("../controllers/book.controller");
const authenticate = require("../middleware/authenticate");
const authCtrl = require("../controllers/auth.controller");
const { body, validationResult } = require('express-validator');
const { title, author, genre, year, description, published, rating } = require("../validation-rules/book.validation");

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
    app.get("/api/books", [authenticate.verifyToken, authenticate.isAdmin], controller.findAll);
    app.put("/api/books/:id", validate([title, author, genre, year, published, description]), controller.update);
    app.delete("/api/books/:id", controller.delete);
    app.post("/api/books/:id/reviews", validate([rating]), controller.addReview);
    app.get("/api/books/:id/reviews", controller.listReview);
    app.delete("/api/admin/reviews/:id", controller.deleteReview);
}