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
  const keys = Object.keys(fields)
  const values = Object.values(fields)
  if (keys.length == 0) return false;

  const setString = keys.map(
    (key, index) => `"${ key }"=$${ index + 1}`
  ).join(', ');

  try{
    const { rows: [ vehicle ] } = await client.query(`
      UPDATE vehicles SET ${ setString }
      WHERE id=$${ keys.length + 1 } RETURNING *;`
      , [...values, id]);
      
      // console.log("Result:", vehicle);
      // console.log("Result:", data);
    return vehicle;
  } catch (error) {
    console.log(error)
  }
}

async function getAllVehicles() {
  try {
    const { rows: vehicles } = await client.query(`
      SELECT *
      FROM vehicles;
    `);

    // const vehicles = await Promise.all(vehicleId.map(
    //   vehicle => getVehicleById( vehicle.id )
    // ));

    return vehicles;
  } catch (error) {
    console.log(error);
  }
}

async function getVehiclesByActive() {
  try {
    const { rows: vehicles } = await client.query(`
      SELECT *
      FROM vehicles
      WHERE "isActive" = true;
    `);

    return vehicles;
  } catch(error) {
    console.log(error);
  }
};

async function getVehicleById(vehicleId) {
  try {
    const { rows: [ vehicles ] } = await client.query(`
    SELECT *
    FROM vehicles
    WHERE id=$1;
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
  getVehiclesByActive,
  getVehicleById
}