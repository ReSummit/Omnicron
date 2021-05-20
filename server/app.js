const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Routes
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const profileRouter = require('./routes/profile');
const eventRouter = require('./routes/events');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/profile', profileRouter);
app.use('/events', eventRouter);

dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

module.exports = app;
