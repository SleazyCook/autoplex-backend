const express = require('express');
const photosRouter = express.Router();

const {
  createPhoto,
  updatePhoto,
  getAllPhotos,
  getPhotoById
} = require('../db/photos')

module.exports = photosRouter;