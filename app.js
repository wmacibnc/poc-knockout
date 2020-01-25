const express = require('express');
const app = express();

const index = require('./src/router/index.router');
const livro = require('./src/router/livro.router');

app.use('/', index);
app.use('/livro', livro);

module.exports = app;