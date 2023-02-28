const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    isManager: { type: Boolean, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item', required: true }]
});

userSchema.methods.addItem = function (item) {
    console.log('addItem');
    console.log(item);
    const userItems = this.items;
    userItems.push(item);
    this.items = userItems;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User{
//     constructor(username, email){
//         this.name = username;
//         this.email = email;
//     }

//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     static findById(userId){    
//         const db = getDb();
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)}).then(user => {  
//             console.log(user);
//             return user;
//         }).catch(err => {
//             console.log(err);
//         }
//         );
//     }
// }

// module.exports = User;