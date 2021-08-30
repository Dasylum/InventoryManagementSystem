const dotenv = require('dotenv');
dotenv.config({path: ".env"});

module.exports = {
    port: process.env.PORT || 5050,
    db_host: process.env.DBHOST || '127.0.0.1',
    db_user: process.env.DBUSER || 'root',
    db_pass: process.env.DBPASS || 'Ds8764082465',
    db: process.env.db || 'inventoryApp'
}