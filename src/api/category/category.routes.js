const express = require('express');
const Category = require('./category.model');

const router = express.Router();

const queries = require('./category_queries');

router.get('/', async (req, res) => {
    try{
        const category = await Category
            .query()
            .withGraphFetched('category')
            .where({})

        res.json({
            category: category,
            error: null
        });
    } catch(error) {
        res.json({
            error: error,
            category: null
        })
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await queries.get(parseInt(id, 10) || 0);
        if (category) {
            return res.json(category);
        }
        return next();
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { data } = req.body;
    try {
        const category = await queries.post(data);
        if (category) {
            return res.json(category);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/:id', async (req, res, next) => {
    const { data } = req.body;
    const { id } = req.params;
    try {
        const category = await queries.update(data, id);
        if (category) {
            return res.json(category);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;
