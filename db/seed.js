// const { getAllUsers } = require('../../../../2209/course-work/project_07/juicebox/db');
const {client} = require('./index');

const {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername
} = require('./users');

const {
  createVehicle,
  updateVehicle,
  getAllVehicles,
  getVehicleById
} = require('./vehicles')

async function dropTables(){
  console.log("WE ABOUT TO DROP THIS SHIIIIIIIIIIIIIIT");
  try {
    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS vehicles;
    DROP TABLE IF EXISTS reviews;
    `);

    console.log("Finished dropping tables");
  } catch (error) {
    console.log(error)
  }
}

async function createTables(){
  console.log("CREATING THESE MOTHERFUCKING TABLES")
  try{
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE vehicles(
      id SERIAL PRIMARY KEY,
      make VARCHAR(255) NOT NULL,
      model VARCHAR(255) NOT NULL,
      submodel VARCHAR(255),
      engine VARCHAR(255),
      "year" INTEGER,
      "exteriorColor" VARCHAR(255),
      "interiorColor" VARCHAR(255),
      mileage INTEGER,
      "VIN" VARCHAR(255),
      "stockNumber" VARCHAR(255),
      "retailPrice" VARCHAR(255),
      featured BOOLEAN DEFAULT FALSE,
      active BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      customer VARCHAR(255),
      quote TEXT
    );
    `)
      console.log('makes me want a hot dog real bad')
  } catch (error) {
    console.log(error);
  }
}

async function createInitialUsers(){
  try{
    console.log("Beginning to createInitalUsers");
    const peteDavidson = await createUser({username: 'peteDavidson', password: 'kimNemrata'});
    const macMiller = await createUser({username: 'macMiller', password: 'whatstheuse'});
    const husbandAriana = await createUser({username: 'daltonGomez', password: 'whoTheFuckIsThisGuy'})
    console.log(peteDavidson);
    console.log(macMiller);
    console.log(husbandAriana);
    console.log("Successfully completed creating users")
  } catch (error) {
    console.log(error);
  }
}

async function createInitialVehicles(){
  try{
    console.log("Beginning to createInitalVehicles");
    const drewCar = await createVehicle({
      make: 'Honda',
      model: 'Civic',
      submodel: 'Si Sedan',
      engine: '4-cylinder',
      year: 2019,
      exteriorColor: 'Galaxy Blue',
      interiorColor: 'grey',
      mileage: 60000,
      VIN: '12341234123412341',
      stockNumber: '1234123412341',
      retailPrice: '$20,000',
      featured: true,
      active: true
    })
    const ianCar = await createVehicle({
      make: 'Toyota',
      model: 'Camry',
      submodel: 'ians',
      engine: 'kindOfDityButOtherwiseFine',
      year: 2003,
      exteriorColor: 'grey',
      interiorColor: 'grey',
      mileage: 160000,
      VIN: '14321432143214321',
      stockNumber: '987654321123',
      retailPrice: '$4,000',
      featured: false,
      active: false
    })
    console.log(drewCar)
    console.log(ianCar)
    console.log("Successfully completed creating vehilces")
  } catch(error) {
    console.log(error);
  }
}

async function testDB() {
  // await updateVehicle(1, {year: 2020, active: false});
  await getVehicleById(1);
}

async function rebuildDB(){
  client.connect();
  await dropTables();
  await createTables();
  await createInitialUsers();
  await createInitialVehicles();
  await testDB();
  client.end();
}

rebuildDB();