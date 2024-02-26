const { Pool } = require('pg');


const pool = new Pool({
    user: 'postgres_write',
    host: 'localhost',
    database: 'postgres_db',
    password: 'your_password',
    port: 5432,
});

module.exports = { pool };