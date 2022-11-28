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
  try {
    const vehicles = await getAllVehicles();
    res.send({vehicles})
  } catch (error) {
    console.log(error)
  }
});

vehiclesRouter.post('/', async (req, res, next) => {
  const {typeId, make, model, submodel, engine, year, exteriorColor, interiorColor, mileage, VIN, stockNumber, retailPrice, inStock, isFeatured, isActive} = req.body;

  try{
    const vehicle = await createVehicle({
      typeId, make, model, submodel, engine, year, exteriorColor, interiorColor, mileage, VIN, stockNumber, retailPrice, inStock, isFeatured, isActive
    });

    res.send({
      message: "Vehicle added",
      vehicle: vehicle
    })
  } catch (error) {
    console.log(error);
  }
});

// layered object, pass id, then fields
vehiclesRouter.patch('/', async (req, res, next) => {

  const {id, fields} = req.body;

  try{
    const vehicle = await updateVehicle(id, fields);

    res.send({
      message: "Vehicle updated",
      vehicle: vehicle
    })
  } catch (error) {
    console.log(error);
  }
});


module.exports = vehiclesRouter;