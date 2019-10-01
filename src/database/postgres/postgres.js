/* eslint-disable no-console */
/* eslint-disable global-require */
const { Pool } = require('pg');
const { logError } = require('../../utils/logger');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
});

pool.query('SELECT NOW()', (error, res) => {
    if (error) {
        logError(error);
    }
    pool.end();
});

module.exports = pool;
