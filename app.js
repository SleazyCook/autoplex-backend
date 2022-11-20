// 1. import express
const express = require('express');
// morgan is a tool used to test success/fail on server
const morgan = require('morgan')

// 2. create new Express server instance
const app = express();

// use morgan before calling ANY paths in order to properly test everything
app.use(morgan('dev'));
// allows to read in localhost
app.use(express.json());

const apiRouter = require('./api');

// app.listen is always at the bottom. this boots up the server after all the other shit.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`We are now up and cooking on port ${PORT}!`)
});