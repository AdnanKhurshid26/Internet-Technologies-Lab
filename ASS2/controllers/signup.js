const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getSignup = (req, res, next) => {
    res.render('signup', { pageTitle: 'Signup', path: '/signup' });
}

exports.postSignup = (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;

    User.findOne({ name: username }).then(userDoc => {
        if (userDoc) {
            console.log('User already exists');
            console.log(userDoc);
            return res.redirect('/signup');
        }
        const user = new User({
            password: password,
            name: username,
            items: [],
            isManager: false
        });
         return user.save();
    }).then(result => {
        console.log(result);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })};
