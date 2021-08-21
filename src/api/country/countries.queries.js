const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name'];

module.exports = {
    find() {
        return db(tableNames.country).select(fields)
    },

    async get(id) {
        const [state] = await db(tableNames.country)
            .select(fields)
            .where({
                id
            });
        return state;
    }   
}