const express = require('express');

const router = express.Router();

const queries = require('./item_image.queries');

router.get('/', async (req, res) => {
    const item_image = await queries.find();
    res.json(item_image);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const item_image = await queries.get(parseInt(id, 10) || 0);
        if (item_image) {
            return res.json(item_image);
        }
        return next();
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { data } = req.body;
    try {
        const item_image = await queries.post(data);
        if (item_image) {
            return res.json(item_image);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/:id', async (req, res, next) => {
    const { data } = req.body;
    const { id } = req.params;
    try {
        const item_image = await queries.update(data, id);
        if (item_image) {
            return res.json(item_image);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;