const express = require('express');
const photosRouter = express.Router();

const {
  createPhoto,
  updatePhoto,
  getAllPhotos,
  getPhotoById
} = require('../db/photos')

photosRouter.use((req, res, next) =>  {
  console.log('A request is being made to /photos');
  next();
})

// comment in for testing. comment out for deploy.
photosRouter.get('/',async(req,res,next)=>{
  try{
    const photos = await getAllPhotos();
    res.send(photos)
    next();
    } catch(error){
    console.log(error);
  }
});

photosRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const photo = await getPhotoById(id);
    res.send(photo)
  } catch(error) {
    console.log(error)
  }
})

photosRouter.post('/', async (req, res, next) => {
  const { vehicleId, alt, url, isActive} = req.body;

  try {
    const photo = await createPhoto({
      vehicleId, alt, url, isActive
    });

    res.send({
      message: "Photo",
      photo: photo
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = photosRouter;