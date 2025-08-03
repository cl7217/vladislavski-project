const express = require('express');
const cors = require('cors');
const path = require('path');
const uploadRoute = require('./routes/upload');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/upload', uploadRoute);

module.exports = app;
