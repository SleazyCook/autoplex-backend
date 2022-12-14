const { client } = require('.');

async function getPhotoById(photoId) {
  try {
    const { rows: [ photo ] } = await client.query(`
      SELECT *
      FROM photos
      WHERE id=$1 
      AND "isActive" = true;
    `, [photoId]);

    if (!photo) {
      throw {
        name: "PhotoNotFoundError",
        message: "Could not find a photo with that photoId"
      };
    }
    console.log('photos get by id', photo)
    return photo;
  } catch (error) {
    console.log(error);
  }
}

async function getAllPhotos() {
  try {
    const { rows: photoId } = await client.query(`
      SELECT id
      FROM photos;
    `);

    const photos = await Promise.all(photoId.map(
      photo => getPhotoById( photo.id )
    ));

    return photos;
  } catch (error) {
    console.log(error);
  }
}

async function getPhotosByActive() {
  try {
    const { rows: photos } = await client.query(`
      SELECT *
      FROM photos
      WHERE "isActive" = true;
    `);

    return photos;
  } catch(error) {
    console.log(error);
  }
};

async function createPhoto({
  vehicleId,
  alt,
  url,
  isActive
}) {
  try {
    const { rows: [ photo ] } = await client.query(`
      INSERT INTO photos("vehicleId", alt, url, "isActive")
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [vehicleId, alt, url, isActive]);

    return photo;
  } catch (error) {
    console.log(error);
  }
}

async function updatePhoto(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
    const { rows: [ photo ] } = await client.query(`
      UPDATE photos SET ${ setString }
      WHERE id=${ id } RETURNING *;`
      , Object.values(fields));

      console.log("Result:", photo);
  } catch (error) {
    console.log(error)
  }
}

async function deletePhoto(id) {
  try {
    const { rows: [ photo ] } = await client.query(`
    UPDATE photos SET "isActive"=false
    WHERE id=${ id } RETURNING *;`)

    console.log("Photo Delete Result", photo.isActive)
    return photo;
   
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createPhoto,
  updatePhoto,
  getAllPhotos,
  getPhotosByActive,
  getPhotoById,
  deletePhoto
}