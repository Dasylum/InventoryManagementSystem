const express = require('express');

const router = express.Router();

const queries = require('./item_type.queries');

router.get('/', async (req, res) => {
    const item_type = await queries.find();
    res.json(item_type);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const item_type = await queries.get(parseInt(id, 10) || 0);
        if (item_type) {
            return res.json(item_type);
        }
        return next();
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { data } = req.body;
    try {
        const item_type = await queries.post(data);
        if (item_type) {
            return res.json(item_type);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/:id', async (req, res, next) => {
    const { data } = req.body;
    const { id } = req.params;
    try {
        const item_type = await queries.update(data, id);
        if (item_type) {
            return res.json(item_type);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;