const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./cart.schema.json');

class Cart extends Model {
    static get tableName() {
        return tableNames.cart;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = Cart;