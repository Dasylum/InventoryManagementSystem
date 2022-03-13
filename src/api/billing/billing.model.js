const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./billing.schema.json');

class Billing extends Model {
    static get tableName() {
        return tableNames.billing;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = Billing;