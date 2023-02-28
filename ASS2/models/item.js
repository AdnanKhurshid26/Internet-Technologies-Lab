const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fileExtension: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Item {
//     constructor(title, imageUrl,userid) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.userid = userid;
//     }
//     save() {
//         const db = getDb();
//         return db.collection('items').insertOne(this).then(result => {
//             console.log(result);
//         }).catch(err => {
//             console.log(err);
//         }
//         );
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('items').find().toArray().then(items => {
//             console.log(items);
//             return items;
//         }).catch(err => {
//             console.log(err);
//         }
//         );
//     }
// }

// module.exports = Item;