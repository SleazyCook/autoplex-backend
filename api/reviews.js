const express = require('express');
const reviewsRouter = express.Router();

const {
  createReview,
  updateReview,
  getAllReviews,
  getReviewById
} = require('../db/reviews');

// comment in for testing. comment out for deploy.
reviewsRouter.get('/',async(req,res,next)=>{
  try{
    const review = await getAllReviews();
    res.send({reviews})
    next();
    } catch(error){
    console.log(error);
  }
});

module.exports = reviewsRouter;