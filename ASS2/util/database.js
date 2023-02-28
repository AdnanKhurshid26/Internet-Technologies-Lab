// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// const mongoConnect = callback => {
//     MongoClient.connect('mongodb+srv://adnan2601:adnan@cluster0.gsefr4w.mongodb.net/muliticlirepo?retryWrites=true&w=majority', { useNewUrlParser: true }).then(client => {
//         console.log('Connected');
//         _db = client.db();
//         callback();
//     }).catch(err => {
//         console.log(err);
//     });
// }

// const getDb = () => {
//     if (_db) {
//         return _db;
//     }
//     throw 'No database found';
// }


// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;

