// const { Client } = require('pg');
// const { getPostsByUser } = require('./db');
const pg = require('pg');
const client = new pg.Client('postgres://localhost:5432/autoplex')

module.exports = {
  client
}