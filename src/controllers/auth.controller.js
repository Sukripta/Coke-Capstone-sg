const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/db.config');

exports.registerUser = async (request, resposne) => {
    try {
        const {email, username} = request?.body;
        const chkMail = await User.findOne({ email });
        if (chkMail) {
            return resposne.status(400).send({
                message: 'Email already exsit.'
            });
        }
        const chkUser = await User.findOne({ username });
        if (chkUser) {
            return resposne.status(400).send({
                message: 'Username already exsit.'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request?.body?.password, salt);
        const newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        })
        const data = await newUser.save(newUser);
        resposne.status(200).send({
            message: 'User registration successful',
            data: data
        });
    } catch (err) {
        resposne.status(400).send({
            message: err.message || 'Something went wrong'
        })
    }
}

exports.loginUser = async (request, response) => {
    const {username, password} = request.body; 
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(404).send({
                message: 'Enter valid username'
            });
        }
        const chkPass = await bcrypt.compare(password, user.password)
        if (chkPass) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET.key, { expiresIn: '4h' });
            response.status(200).send({
                username: user.username,
                email: user.email,
                roles: user.role,
                accessToken: token,
            });
        }
        else {
            response.status(400).send({
                message: 'Enter correct password.'
            });
        }
    } catch (err) {
        response.status(400).send({
            message: err.message || 'Something went wrong'
        });
    }
}