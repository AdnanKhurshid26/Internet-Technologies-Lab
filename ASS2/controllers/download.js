const fs = require('fs');
const Item = require('../models/item');
const User = require('../models/user');
exports.getDownload = (req, res, next) => {
    const itemId = req.params.itemId;
    console.log(itemId);

 Item.findById(itemId).then(item => {

        if (!item) {
            return res.redirect('/myrepo');
        }

        if (item.userid.toString() !== req.session.user._id.toString()) {
            return res.redirect('/myrepo');
        }

        console.log(item);
        const title = item.title;
        const file = `${__dirname}/../${item.imageUrl}`;
        res.download(file, title);
    }).catch(err => {
        console.log(err);
    });

}

exports.getDelete = (req, res, next) => {
    const itemId = req.params.itemId;

    Item.findById(itemId).then(item => {
        if(!item){
            return res.redirect('/myrepo');
        }
        if(item.userid.toString() !== req.session.user._id.toString()){
            return res.redirect('/myrepo');
        }

        const file = `${__dirname}/../${item.imageUrl}`;
        
        fs.unlink(file, err => {
            if(err){
                console.log(err);
            }
        }
        );

        Item.findByIdAndRemove(itemId).then(result => {
            console.log('Item Deleted');
            
            User.findById(req.session.user._id).then(user => {
                user.items.pull(itemId);
                return user.save();
            }).then(result => {
                console.log('Item Deleted from User');
            }).catch(err => {
                console.log(err);
            });

            res.redirect('/myrepo');
        }).catch(err => {
            console.log(err);
        }
        );
    }).catch(err => {
        console.log(err);
    }
    );
}



