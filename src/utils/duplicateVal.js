const { books } = require("../models")

// todo : make a generic check
exports.checkDuplicateName = (title) => {
    return books.find({'title': title}); 
}