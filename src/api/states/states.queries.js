const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name'];

module.exports = {
    find() {
        return db(tableNames.state).select(fields)
    },

    async get(id) {
        const [state] = await db(tableNames.state)
            .select(fields)
            .where({
                id
            });
        return state;
    }   
}