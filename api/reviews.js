const express = require('express');
const reviewsRouter = express.Router();

const {
  createReview,
  updateReview,
  getAllReviews,
  getReviewById
} = require('../db/reviews');

module.exports = reviewsRouter;