const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const { afterUpdate } = require('../users/user.model');

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
            const validProps = ['name', 'description', 'image_url'];
            for(var i in Object.keys(data)){
                if(!validProps.includes(Object.keys(data)[i])){
                    const error = new Error;
                    error.message = "This property doesn't exist or can't be updated";
                    error.status = 500;
                    throw error;
                }
            }
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