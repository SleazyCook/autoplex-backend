// const { Client } = require('pg');
// const { getPostsByUser } = require('./db');

require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DB_URL || 'postgres://localhost:5432/autoplex');

module.exports = {
  client
}