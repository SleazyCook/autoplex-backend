const express = require('express');
const typesRouter = express.Router();

const {
  createType,
  updateType,
  getAllTypes,
  getTypesById
} = require('../db')