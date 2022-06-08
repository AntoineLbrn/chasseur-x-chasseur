const { Client } = require('pg');
require('dotenv').config()

module.exports = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});