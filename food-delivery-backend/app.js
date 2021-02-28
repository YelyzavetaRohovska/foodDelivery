const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/food-delivery', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const indexRouter = require('./routes');

app.use(cors({origin: [process.env.CLIENT_APP_URL, process.env.DRIVER_APP_URL], credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter(app));


module.exports = app;
