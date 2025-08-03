const express = require('express');
const cors = require('cors');
const path = require('path');
const uploadRoute = require('./routes/upload');
const itemsRoute = require('./routes/items');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/upload', uploadRoute);

app.use('/items', itemsRoute);

module.exports = app;
