const { client } = require('.');

async function createUser({ 
  username, 
  password
}) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);

    return user;

  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username
      FROM users;
    `);
  
    return rows;
    
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1
    `, [ username ]);

    if (!user) {
      throw ({
        name: "UserNotFoundError",
        message: "A user with that username does not exist"
      })
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername
};