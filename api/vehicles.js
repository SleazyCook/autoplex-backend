const express = require('express');
const vehiclesRouter = express.Router();

const jwt = require('jsonwebtoken');
const { 
  createVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById
} = require('../db/vehicles');

vehiclesRouter.use((req, res, next) => {
  console.log('A request is being made to /vehicles');

  next();
})

vehiclesRouter.get('/', async (req, res) => {
  const vehicles = await getAllVehicles();
  res.send({
    vehicles
  })
});

module.exports = vehiclesRouter;