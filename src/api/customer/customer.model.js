const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./customer.schema.json');

class Customer extends Model {
    static get tableName() {
        return tableNames.customer;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = Customer;