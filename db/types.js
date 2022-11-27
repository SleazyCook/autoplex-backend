const { client } = require('.');

async function createType(
  vehicleType,
) {
  try {
    const { rows: [vehicleType1] } = await client.query(`
    INSERT INTO types("vehicleType")
    VALUES ($1)
    ON CONFLICT ("vehicleType") DO NOTHING
    RETURNING *;
  `, [vehicleType]);

    return vehicleType1;
    
  } catch (error) {
    console.log(error);
  }
}

async function updateType(id, fields = {}) {
  // const setString = Object.keys(fields).map(
  //   (key, index) => `"${ key }"=$${ index + 1}`
  // ).join(', ');

  try {
    const {rows: [ typeId ] } = await client.query(`
    SELECT id
    FROM types;
    `);

    const types = await Promise.all(vehicleId.map(
      type => getTypeById( type.id )
    ));
  } catch (error) {
    console.log(error);
  }
}

async function getAllTypes() {
  try{
    const { rows } = await client.query(`
      SELECT id, "vehicleType"
      FROM types
    `);

    // const types = await Promise.all(typesId.map(
    //   types => getTypesById( types.id )
    // ));

    return rows;

  } catch (error) {
    console.log(error);
  }
}

async function getTypesById(typeId) {
  try {
    const { rows: [ types ] } = await client.query(`
      SELECT * 
      FROM vehicles
      WHERE id=$1
    `, [typeId]);

    if (!types) {
      throw {
        name: "TypesNotFoundError",
        message: "Could not find a vehicle with that TypeId"
      };
    }
    console.log('types get by id', types)
    return types;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createType,
  updateType,
  getAllTypes,
  getTypesById
}