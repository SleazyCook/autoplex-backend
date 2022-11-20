const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.emitWarning;
require('dotenv').config();

// import users functions from database
const {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername
} = require('../db');

const {} = require('../db'); //require funcitons from db

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');

  next();
})

usersRouter.get('/', async(req, res) => {
  const users = await getAllUsers();
  console.log('where am i');
  res.send({
    users
  });
});

usersRouter.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try{
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const newToken = jwt.sign({
        username: user
      })
      res.send({ message: "you're logged in!", newToken });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect"
      });
    } 
  } catch (error) {
    console.log (error);
    next(error)
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, name } = req.body;

  try{
    const _user = await getUserByUsername (username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({
      username,
      passoword
    });

    const token = jwt.sign({
      id: user.id,
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });
  } catch ({ name, message }) {
    next ({name, message})
  }
});

module.exports = userRouter;