const express = require('express');
const typesRouter = express.Router();

const {
  createType,
  updateType,
  getAllTypes,
  getTypesById
} = require('../db/types');

typesRouter.get('/', async (req, res, next) => {
  try {
    const allTypes = await getAllTypes();

    const types = allTypes.filter(type => {
      if (types.active) {
        return true;
      } 

      return false;

    })
  } catch (error) {
    console.log(error);
  }
});

typesRouter.post('/', async (req, res, next) => {
  const { vehicleType } = req.body;
})

module.exports = typesRouter;