const knex = require('knex');

const { Model } = require('objection');

const knexConfig = require('../db/knexfile');

const environment = 'development';
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;