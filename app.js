const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
const morgan = require('morgan');
const app = express();


mongoose.connect('mongodb://localhost:27017/blog-article', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => {
    console.log('Problem connection to the database' + error);
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
const articleRoute = require('./routes/article');
app.use('/article', articleRoute);


module.exports = app;

