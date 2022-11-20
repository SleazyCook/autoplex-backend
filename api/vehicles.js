const express = require('express');
const vehiclesRouter = express.Router();

const jwt = require('jsonwebtokn');
const { 
  createVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById
} = require('.../db');

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

