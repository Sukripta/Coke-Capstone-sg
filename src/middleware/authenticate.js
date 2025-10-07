const config = require('../config/db.config');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Book = db.Book;
const User = db.User;


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        res.status(403).send({ messagee: "Please provide valid token" });
    }
    else {
        jwt.verify(token, config.key, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: "Unauthorized token" });
            }
            req.userId = decoded.id;
            req.role = decoded.role;
            next();
        })
    }
}

const verifyUser = async (req, res, next) => {
    const id = req.params.id;
    const username = req.body.username;
    try {

        if (!id || !username) {
            return resposne.status(400).send({
                message: 'Id or Username missing.'
            });
        }
        const newUser = await User.findById(username);
        const newBook = await Book.findById(id);


        if (newUser.role === 'admin' || newUser._id.equals(newBook.createdById)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied: not the owner' });
        }
    } catch (err) {
        resposne.status(400).send({
            message: err.message || 'Something went wrong'
        });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const newUser = await User.findById(req.username);
        if (newUser.role === 'admin') {
            next();
        }
        else {
            res.send({ message: 'Unauthorised : Admin role is required' });
        }
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
}

const isUser = async (req, res, next) => {
    try {
        const newUser = await User.findById(req.username);
        if (newUser.name === 'user') {
            next();
        }
        else {
            res.send({ message: 'Unauthorised : User role is required' });
        }
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
}

const auth = {
    verifyToken, isAdmin, isUser, verifyUser
};
module.exports = auth;