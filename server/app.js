const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



// Routes
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const profileRouter = require('./routes/profile');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cors());
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/profile', profileRouter);

dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

module.exports = app;
