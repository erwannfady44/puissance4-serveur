const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const gameRouter = require('./routes/game');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);

mongoose.connect('mongodb+srv://puissance4:wZWWGjFMU8Tt2ag@cluster0.5p7eq.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log("connected to database")
    }).catch(err => console.log(err.message));

module.exports = app;

