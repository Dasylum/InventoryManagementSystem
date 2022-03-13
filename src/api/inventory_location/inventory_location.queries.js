const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ["id", "name", "description", "image_url"];

module.exports = {
    find() {
        return db(tableNames.inventory_location).select(fields);
    },
    async get(id) {
        const [inventory_location] = await db(tableNames.inventory_location)
            .select(fields)
            .where({
                id
            });
        return inventory_location;
    },
    async post(data) {
        // Add validation on data ?
       try {
        const location = {
            name: data.name,
            description: data.description?data.description:null,
            image_url: data.image_url?data.image_url:null,
        }
        return await db(tableNames.inventory_location).returning("id").insert(location);
       } catch (error) {
           throw error;
       }
    },
    async update(data, id) {
        try {
            return await db(tableNames.inventory_location)
            .where({
                id
            })
            .update(data, ['id', 'name', 'description']);
        } catch (error) {
            throw error;
        }
    }
}