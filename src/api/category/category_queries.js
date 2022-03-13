const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ["id", "name"];

module.exports = {
    find() {
        return db(tableNames.category).select(fields);
    },
    async get(id) {
        const [category] = await db(tableNames.category)
            .select(fields)
            .where({
                id
            });
        return category;
    },
    async post(data) {
        // Add validation on data ?
       try {
        const category = {
            name: data.name,
        }
        return await db(tableNames.category).insert(category, ["id"]);
       } catch (error) {
           throw error;
       }
    },
    async update(data, id) {
        try {
            return await db(tableNames.category)
            .where({
                id
            })
            .update(data, ['id',]);
        } catch (error) {
            throw error;
        }
    }
}