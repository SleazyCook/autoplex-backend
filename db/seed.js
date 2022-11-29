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
  createType,
  updateType,
  getAllTypes,
  getTypesById
} = require('./types')

const {
  createVehicle,
  updateVehicle,
  getAllVehicles,
  getVehiclesByActive,
  getVehicleById
} = require('./vehicles')

const {
  createPhoto,
  updatePhoto,
  getAllPhotos,
  getPhotoById
} = require('./photos')

const {
  createReview,
  updateReview,
  getAllReviews,
  getReviewById
} = require('./reviews')

async function dropTables(){
  console.log("WE ABOUT TO DROP THIS SHIIIIIIIIIIIIIIT");
  try {
    await client.query(`
    DROP TABLE IF EXISTS photos;
    DROP TABLE IF EXISTS vehicles;
    DROP TABLE IF EXISTS types;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
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
    CREATE TABLE types(
      id SERIAL PRIMARY KEY,
      "vehicleType" VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE vehicles(
      id SERIAL PRIMARY KEY,
      "typeId" INTEGER REFERENCES types(id),
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
      "inStock" BOOLEAN DEFAULT FALSE,
      "isFeatured" BOOLEAN DEFAULT FALSE,
      "isActive" BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE photos(
      id SERIAL PRIMARY KEY,
      "vehicleId" INTEGER REFERENCES vehicles(id),
      alt VARCHAR(255),
      url VARCHAR(255),
      "isActive" BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      quote TEXT,
      "imgAlt" VARCHAR(255),
      "imgUrl" VARCHAR(255),
      "isActive" VARCHAR(255)
    );
    `)
      console.log('Successfully created Tables')
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

async function createInitialTypes(){
  try{
    console.log("Beginning to createInitialTypes");
    const smallVroom = await createType({vehicleType: 'car'});
    const mediumVroom = await createType({vehicleType: 'suv'});
    const utilityVroom = await createType({vehicleType: 'truck'});
    console.log(smallVroom);
    console.log(mediumVroom);
    console.log(utilityVroom);
    console.log('finished creatinInitialTypes')
  } catch (error) {
    console.log(error)
  }
}

async function createInitialVehicles(){
  try{
    console.log("Beginning to createInitalVehicles");
    const drewCar = await createVehicle({
      typeId: 1,
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
      inStock: true,
      isFeatured: true,
      isActive: true
    })
    const ianCar = await createVehicle({
      typeId: 1,
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
      inStock: true,
      isFeatured: false,
      isActive: false
    })
    console.log(drewCar)
    console.log(ianCar)
    console.log("Successfully completed creating vehilces")
  } catch(error) {
    console.log(error);
  }
}

async function createInitialReviews() {
  try {
    console.log("Beginning to createInitialReviews");
    const drewCook = await createReview({name: 'drewford', quote: 'I like it a lot', imgAlt: 'a beautiful man', imgUrl: 'asdfasdfasdf', isActive: true });
    const tessDlV = await createReview({name: 'tessa', quote: 'I just work here', imgAlt: 'a great employee', imgUrl: 'asdfasdfasdfasdfasdf', isActive: true});
    console.log(drewCook);
    console.log(tessDlV);
    console.log('finished creatingInitialReviews');
  } catch (error) {
    console.log(error)
  }
}

async function createInitialPhotos() {
  try{
    console.log("beginning to createInitialPhotos");
    const logo = await createPhoto({vehicleId: 1, alt: "civic-front", url: "https://i.imgur.com/WWvB4QC.png", isActive: true});
    const background = await createPhoto({vehicleId: 1, alt: "civic-interior", url: "https://i.imgur.com/5crjtOr.png", isActive: true});
    console.log(logo);
    console.log(background);
    console.log("finished creating InitialPhotos");
  } catch (error) {
    console.log(error);
  }
}

async function testDB() {
  await updateVehicle(1, {year: 2020, isActive: false});
  await getVehicleById(1);
}

async function rebuildDB(){
  client.connect();
  await dropTables();
  await createTables();
  await createInitialUsers();
  await createInitialTypes();
  await createInitialVehicles();
  await createInitialReviews();
  await createInitialPhotos();
  await testDB();
  client.end();
}

rebuildDB();