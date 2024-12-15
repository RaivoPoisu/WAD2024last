// database.js
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "superuser",
    database: "Posts",
    host: "localhost",
    port: "5432"
});

module.exports = pool;