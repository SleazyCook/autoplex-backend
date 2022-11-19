const { client } = require('.');

async function createVehicle({
  typeId,
  make,
  model,
  submodel,
  engine,
  year,
  exteriorColor,
  interiorColor,
  mileage,
  VIN,
  stockNumber,
  retailPrice,
  inStock,
  isFeatured,
  isActive,
}) {
  try {
    const { rows: [ vehicle ] } = await client.query(`
      INSERT INTO vehicles("typeId", make, model, submodel, engine, year, "exteriorColor", "interiorColor", mileage, "VIN", "stockNumber", "retailPrice", "inStock", "isFeatured", "isActive")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `, [typeId, make, model, submodel, engine, year, exteriorColor, interiorColor, mileage, VIN, stockNumber, retailPrice, inStock, isFeatured, isActive]);

    return vehicle;

  } catch (error) {
    throw error;
  }
}
// photos on their own tables ()
// MATERIALIZE UI - carousel photos, or MUI

async function updateVehicle(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1}`
  ).join(', ');

  try{
    const { rows: [ vehicle ] } = await client.query(`
      UPDATE vehicles SET ${ setString }
      WHERE id=${ id } RETURNING *;`
      , Object.values(fields));
      
      console.log("Result:", vehicle);
    return vehicle;
  } catch (error) {
    console.log(error)
  }
}

async function getAllVehicles() {
  try {
    const { rows: vehicleId } = await client.query(`
      SELECT id
      FROM vehicles;
    `);

    const vehicles = await Promise.all(vehicleId.map(
      vehicle => getVehicleById( vehicle.id )
    ));

    return vehicles;
  } catch (error) {
    console.log(error);
  }
}

async function getVehicleById(vehicleId) {
  try {
    const { rows: [ vehicles ] } = await client.query(`
    SELECT *
    FROM vehicles
    WHERE id=$1
  `, [vehicleId]);

    if (!vehicles) {
      throw {
        name: "VehicleNotFoundError",
        message: "Could not find a vehicle with that vehicleId"
      };
    }
    console.log('vehicles get by id', vehicles)
    return vehicles;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById
}