const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = ["id", "item_id", "image_url"];

module.exports = {
    find() {
        return db(tableNames.item_image).select(fields);
    },
    async get(id) {
        const [item_image] = await db(tableNames.item_image)
            .select(fields)
            .where({
                id
            });
        return item_image;
    },
    async post(data) {
        // Add validation on data ?
       try {
        const item_image = {
            item_id: data.item_id,
            image_url: data.image_url?data.image_url:null,
        }
        return await db(tableNames.item_image).insert(item_image, ["id"]);
       } catch (error) {
           throw error;
       }
    },
    async update(data, id) {
        try {
            const validProps = ['item_id', 'image_url'];
            for(var i in Object.keys(data)){
                if(!validProps.includes(Object.keys(data)[i])){
                    const error = new Error;
                    error.message = "This property doesn't exist or can't be updated";
                    error.status = 500;
                    throw error;
                }
            }
            return await db(tableNames.item_image)
            .where({
                id
            })
            .update(data, ['id',]);
        } catch (error) {
            throw error;
        }
    }
}