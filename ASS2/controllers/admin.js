const User = require('../models/user');
const Item = require('../models/item');

const passcode = 'admin';


exports.getAdmin = (req, res, next) => {

    console.log(req.session.user);

    if(!req.session.isLoggedIn){
        req.flash('error','Please login to access this page.');
        return res.redirect('/');
    }
    if(req.session.user.isManager == false){
        req.flash('error','You do not have permission to access this page.\nPlease login as an admin to access this page.');
        return res.redirect('/adminlogin');
    }

    res.render('admin', {
        pageTitle: 'Admin',
        path: '/admin',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getAdminLogin = (req, res, next) => {

    console.log(req.session.user);

    if(!req.session.isLoggedIn){
        req.flash('error','Please login to access this page.');
        return res.redirect('/login');
    }
    if(req.session.user.isManager == true){
        return res.redirect('/admin');
    }

    res.render('admin_login', {
        pageTitle: 'Admin Login',
        path: '/adminlogin',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.postAdminLogin = (req, res, next) => {

    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    if(req.session.user.isManager == true){
        return res.redirect('/admin');
    }

    const password = req.body.password;

    if(password == passcode){
        User.findById(req.session.user).then(user => {
            user.isManager = true;
            req.session.user = user;
            return user.save();
        }).then(result => {
            console.log(result);
            res.redirect('/admin');
        }).catch(err => {
            console.log(err);
        }
        );
    }
    else{
        res.redirect('/admin_login');
    }
}




exports.getUsers = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    if(req.session.user.isManager == false){
        return res.redirect('/myrepo');
    }
    User.find().then(users => {
        res.render('admin_users', {
            pageTitle: 'Users',
            path: '/users',
            users: users,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getUserRepo = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    if(req.session.user.isManager == false){
        return res.redirect('/myrepo');
    }

    const userId = req.params.userid;

    User.findById(userId).populate('items').then(user => {
        res.render('admin_userrepo', {
            pageTitle: 'User Repository',
            path: '/userrepo',
            username: user.name,
            items: user.items,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getAllFiles = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    if(req.session.user.isManager == false){
        return res.redirect('/myrepo');
    }

    Item.find().then(items => {
        
        res.render('admin_allfiles', {
            pageTitle: 'All Files',
            path: '/allfiles',
            items: items,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch(err => {
        console.log(err);
    });
}

