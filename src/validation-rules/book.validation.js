const { body } = require('express-validator');

const genreEnum = ['Comedy', 'Fantasy', 'Action'];

exports.title = body('title').notEmpty().withMessage('Title is required').isLength({ max: 10 }).withMessage('Title cannot exceed 10 characters');

exports.author = body('author').notEmpty().withMessage('Author is required').isLength({ max: 10 }).withMessage('Author cannot exceed 10 characters');

exports.genre = body('genre').notEmpty().withMessage('Genre is required').isIn(genreEnum).withMessage('Genre should be valid').isLength({ max: 10 }).withMessage('Genre cannot exceed 10 characters');

exports.year = body('year').notEmpty().withMessage('Year is required').isLength({ max: 4 }).withMessage('Year should be 4 characters').isInt({ min: 1000, max: new Date().getFullYear()}).withMessage('Year must be a valid integer before current year');

exports.published =  body('published').isDate().withMessage('Date cannot be in the future.');

exports.description = body('description').notEmpty().withMessage('Description is required').isLength({ max: 50 }).withMessage('Description cannot exceed 50 characters');

exports.rating = body('rating').notEmpty().withMessage('Rating is required').isFloat({ lt: 5 }).withMessage('Rating cannot be more than 5');