const { client } = require('.');

async function createReview ({
  name,
  quote,
  imgAlt,
  imgUrl,
  isActive
}) {
  try {
    const { rows: [ review ] } = await client.query(`
      INSERT INTO reviews(name, quote, "imgAlt", "imgUrl", "isActive")
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `, [name, quote, imgAlt, imgUrl, isActive]);

    return review;

  } catch (error) {
    throw error;
  }
}

async function updateReview(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1}`
  ).join(', ');

  try{
    const { rows: [ review ] } = await client.query(`
      UPDATE reviews SET ${ setString }
      WHERE id=${ id } RETURNING *;`
      , Object.values(fields));

      console.log("Result:", review);
    return review;
  } catch (error) {
    console.log(error)
  }
}

async function getAllReviews() {
  try {
    const { rows: reviewId } = await client.query(`
      SELECT id, name, quote, "imgAlt", "imgUrl", "isActive"
      FROM reviews;
    `);

    const reviews = await Promise.all(reviewId.map(
      review => getReviewById( review.id )
    ));

    return reviews;

  } catch (error) {
    console.log(error);
  }
}

async function getReviewById(reviewId) {
  try {
    const { rows: [ reviews ] } = await client.query(`
      SELECT * 
      FROM reviews
      WHERE id=$1
    `, [reviewId]);

    if (!reviews) {
      throw {
        name: "ReviewNotFoundError",
        message: "Could not find a review with that reviewId"
      };
    }
    console.log('reviews get by id', reviews)
    return reviews;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getReviewById
}