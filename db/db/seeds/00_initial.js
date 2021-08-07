const tableNames = require('../../../src/constants/tableNames');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const countries = require('../../../src/constants/countries');
const states = require('../../../src/constants/states');

exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await Promise.all(Object.keys(tableNames).map(table => knex(table).del()));

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'Dasylum@inventory.com',
    password: await bcrypt.hash(password, 12),
    name: 'Deepak'
  }

  const shapes = [
    {
      name: 'Circular'
    },
    {
      name: 'Cuboid'
    },
    {
      name: 'Round'
    },
    {
      name: 'Cylindrical'
    },
    {
      name: 'Cube'
    }
  ]

  const item_type = [
    {
      name: "Hardware"
    }
  ]

  await knex(tableNames.user).insert(user);
  await knex(tableNames.country).insert(countries);
  await knex(tableNames.state).insert(states);
  await knex(tableNames.shape).insert(shapes);
  await knex(tableNames.item_type).insert(item_type);
};
