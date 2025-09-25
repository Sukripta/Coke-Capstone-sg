const controller = require("../controllers/book.controller");

module.exports = function(app) {

    app.post("/api/books", controller.add); //public route
    app.get("/api/books", controller.findAll);
    app.put("/api/books/:id", controller.update);
}