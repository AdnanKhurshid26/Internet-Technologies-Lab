const User = require('../models/user');
const Item = require('../models/item');
exports.getMyRepo = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        req.flash('error', 'Please login to access this page.');
        return res.redirect('/');
    }

    

    // if(query){
    //     Item.find({ title: { $regex: query, $options: 'i' } }).then(items => {
    //         const user = req.session.user;
    //         res.render('myrepo', {username:user.name, pageTitle: 'Search Results', path: '/search',querystring:query, items: items,isAuthenticated: req.session.isLoggedIn });
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }


    User.findById(req.session.user).populate('items').then(user => {
        res.render('myrepo', { pageTitle: 'My Repository', path: '/myrepo',username: user.name, items: user.items,isAuthenticated: req.session.isLoggedIn });
    }).catch(err => {
        console.log(err);
    });

}

