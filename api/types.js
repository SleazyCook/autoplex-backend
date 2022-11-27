const express = require('express');
const typesRouter = express.Router();

const {
  createType,
  updateType,
  getAllTypes,
  getTypesById
} = require('../db/types');

// comment in for testing. comment out for deploy.
typesRouter.get('/',async(req,res,next)=>{
  try{
    const types = await getAllTypes();
    res.send({types})
    next();
    } catch(error){
    console.log(error);
  }
});

typesRouter.post('/', async (req, res, next) => {
  const {vehicleType}  = req.body;
  console.log(vehicleType)
  try {
    console.log(vehicleType)
    const type = await createType(
      vehicleType
    );

    res.send({
      message: "Type added", type: type
    })
  } catch (error) {
    next ({name, message})
  }
});

module.exports = typesRouter;