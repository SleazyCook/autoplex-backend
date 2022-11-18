// 1. import express
const express = require('express');
// morgan is a tool used to test success/fail on server
const morgan = require('morgan')

// 2. create new Express server instance
const app = express();

// use morgan before calling ANY paths in order to properly test everything
app.use(morgan('dev'));

// 3. write first route handler
// app.get('/', (req, res) => {
//   console.log("Hello World");
//   res.status(200);
//   res.send(`<div><p> Welcome to Elle's Website!</p><a href='/house-of-dragons'>Go to GOT</a><a href='/data'>See JSON Data</a></div>`)
// })

// app.get("/house-of-dragons", (req, res) => {
//   console.log("can't wait for season 2");
//   res.send(`<div><p>Season 2 drops in 2024</p><a href="/">Return To Homepage</a></div>`)
// })

// const gotData = {
//   mainCharacterOne: "Rhaenyra",
//   mainCharacterTwo: "Daemon"
// }

// app.get("/data", (req, res) => {
//   res.send(gotData)
// })

// app.listen is always at the bottom. this boots up the server after all the other shit.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`We are now up and cooking on port ${PORT}!`)
});