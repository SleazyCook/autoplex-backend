const express = require('express');
const reviewsRouter = express.Router();

const {
  createReview,
  updateReview,
  getAllReviews,
  getReviewById,
} = require('../db/reviews');

// comment in for testing. comment out for deploy.
reviewsRouter.get('/', async (req, res, next)=>{
  try{
    const reviews = await getAllReviews();
    res.send({reviews})
    console.log('hey what is happening here', reviews)
    } catch(error){
    console.log(error);
  }
});

reviewsRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const review = await getReviewById(id);
    res.send(review)
  } catch(error) {
    console.log(error)
  }
})

reviewsRouter.post('/', async (req, res, next) => {
  const {name, quote, imgAlt, imgUrl, isActive} = req.body;

  try {
    const review = await createReview({
      name, quote, imgAlt, imgUrl, isActive
    });

    res.send({
      message: "Review added",
      review: review
    })
  } catch (error) {
    console.log(error);
  }
});

reviewsRouter.patch('/', async (req, res, next) => {

  const {id, fields} = req.body;

  try{
    const review = await updateReview(id, fields);

    res.send({
      message: "Review updated",
      review: review
    })
  } catch (error) {
    console.log(error)
  }
});

module.exports = reviewsRouter;