const { Pool } = require('pg');
require('dotenv').config();

const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

const connectionString = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
