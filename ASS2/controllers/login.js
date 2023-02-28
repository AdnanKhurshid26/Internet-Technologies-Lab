const User = require('../models/user');

exports.getLogin = (req, res, next) => {

    if (req.session.isLoggedIn) {
        return res.redirect('/myrepo');
    }
    
    res.render('login', { pageTitle: 'Login', path: '/',errorMessage: req.flash('error') });
    console.log('Login page rendered');
}

exports.postLogin = (req, res, next) => {

    if (req.session.isLoggedIn) {
        return res.redirect('/myrepo');
    }

    const name = req.body.name;
    const password = req.body.password;
    console.log(password);

    User.findOne({ name: name }).then(user => {
        if (!user) {
            req.flash('error','Invalid username or password.');
            return res.redirect('/');
        }

        
        
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
            console.log(err);
            res.redirect('/myrepo');
        });
    }).catch(err => {
        console.log(err);
    });



    // console.log('Login page posted');
    // req.session.isLoggedIn = true;
    // res.redirect('/myrepo');
}