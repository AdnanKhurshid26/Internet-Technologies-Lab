const Item = require('../models/item');
const user = require('../models/user');

exports.getUpload = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        req.flash('error', 'Please login to access this page.');
        return res.redirect('/');
    }

    res.render('upload', { pageTitle: 'Upload', path: '/upload',isAuthenticated: req.session.isLoggedIn });
}

exports.postUpload = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        req.flash('error', 'Please login to access this page.');
        return res.redirect('/');
    }

    const title = req.body.title;
    const image = req.file;

    console.log(image);

    if (!image) {
        return res.status(422).render('upload', {
            pageTitle: 'Upload',
            path: '/upload',
            isAuthenticated: req.session.isLoggedIn,
            errorMessage: 'Attached file is not an image.'
        });
    }

    const imageUrl = image.path;
    const extension = image.mimetype.split('/')[1];
    console.log(extension);

    const item = new Item({
        title: title,
        imageUrl: imageUrl,
        fileExtension: extension,
        userid: req.session.user,
        username: req.session.user.name
    });

    item.save()
        .then(result => {
            console.log('Created Item');
            user.findById(req.session.user)
                .then(user => {
                    user.items.push(item);
                    console.log(user);
                    return user.save();
                })
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
            res.redirect('/myrepo');    
        }
        )
        .catch(err => {
            console.log(err);
        }
        );
}
