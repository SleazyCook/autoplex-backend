const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

// import users functions from database
const {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername
} = require('../db/users');

const {} = require('../db'); //require funcitons from db

// comment this out before deploy
usersRouter.get('/',async(req,res,next)=>{
  try{
    const users = await getAllUsers();
    res.send({users})
    next();
    } catch(error){
    console.log(error);
  }
});

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');
  next();
})

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
      const newToken = jwt.sign({ username: username, id: user.id}
        , JWT_SECRET,{
          expiresIn:"1w"})
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
  const { username, password } = req.body;

  try{

    const user = await createUser({
      username,
      password
    });

    const token = jwt.sign({
      id: user.id,
      username
    }, JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({
      message: "Thank you for signing up",
      token
    })
  } catch ({ name, message }) {
    next ({name, message})
  }
});

module.exports = usersRouter;