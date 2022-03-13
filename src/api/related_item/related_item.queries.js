const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ["id", "item_id", "related_item_id"];

module.exports = {
    find() {
        return db(tableNames.related_item).select(fields);
    },
    async get(id) {
        const [related_item] = await db(tableNames.related_item)
            .select(fields)
            .where({
                id
            });
        return related_item;
    },
    async post(data) {
        // Add validation on data ?
       try {
        return await db(tableNames.related_item).insert(data, fields);
       } catch (error) {
           throw error;
       }
    },
    async update(data, id) {
        try {
            return await db(tableNames.related_item)
            .where({
                id
            })
            .update(data, fields);
        } catch (error) {
            throw error;
        }
    }
}