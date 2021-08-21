const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ["id", "name"];

module.exports = {
    find() {
        return db(tableNames.item_type).select(fields);
    },
    async get(id) {
        const [item_type] = await db(tableNames.item_type)
            .select(fields)
            .where({
                id
            });
        return item_type;
    },
    async post(data) {
        // Add validation on data ?
       try {
        const item_type = {
            name: data.name,
        }
        return await db(tableNames.item_type).insert(item_type, ["id"]);
       } catch (error) {
           throw error;
       }
    },
    async update(data, id) {
        try {
            return await db(tableNames.item_type)
            .where({
                id
            })
            .update(data, ['id',]);
        } catch (error) {
            throw error;
        }
    }
}