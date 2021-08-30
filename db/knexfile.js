const config = require('../config');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: config.db_host,
      user: config.db_user,
      password: config.db_pass,
      database: config.db
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  }

};
