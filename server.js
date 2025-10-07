const express = require("express");
const dbConfig = require("./src/config/db.config");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./src/models");
const Book = db.books;

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
require("./src/routes/book.routes")(app);
require("./src/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//global error handler
app.use((err, req, res, next) => { //middleware 
  console.error(err.stack); // Log error
  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});