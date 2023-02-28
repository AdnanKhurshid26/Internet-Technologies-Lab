const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

const MONGODB_URI = 'mongodb+srv://adnan2601:adnan@cluster0.gsefr4w.mongodb.net/muliticlirepo?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '-' + file.originalname);
  }
});

const mySignupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const myrepoRoutes = require('./routes/myrepo');
const uploadRoutes = require('./routes/upload');
const logoutRoutes = require('./routes/logout')
const downloadRoutes = require('./routes/download');
const adminRoutes = require('./routes/admin');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single('file'));
app.use( express.static( "public" ) );
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(session({secret :'secret',resave: false,saveUninitialized: false,store: store}));
app.use(flash());

// app.use(csrf);

app.use(flash());

app.use(adminRoutes);
app.use(logoutRoutes);
app.use(uploadRoutes);
app.use(myrepoRoutes);
app.use(downloadRoutes);
app.use(mySignupRoutes);
app.use(loginRoutes);



mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {  
  console.log('Connected to MongoDB');
app.listen(3000,'192.168.50.36'); }).catch(err => { console.log(err); });