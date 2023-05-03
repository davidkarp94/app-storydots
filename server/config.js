const env = require('dotenv');
env.config()

const config = {
    db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    },
    listPerPage: 100,
};

module.exports = config;