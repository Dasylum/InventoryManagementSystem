const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./size.schema.json');

class Size extends Model {
    static get tableName() {
        return tableNames.size;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = Size;