exports.getLogin = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        console.log('Logout page rendered');
        res.redirect('/');
    }
    );
    // console.log('Logout page posted');
    // req.session.isLoggedIn = false;
    // res.redirect('/');
};