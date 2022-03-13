const express = require('express');

const router = express.Router();

const queries = require('./related_item.queries');

router.get('/', async (req, res) => {
    const related_item = await queries.find();
    res.json(related_item);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const related_item = await queries.get(parseInt(id, 10) || 0);
        if (related_item) {
            return res.json(related_item);
        }
        return next();
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { data } = req.body;
    try {
        const related_item = await queries.post(data);
        if (related_item) {
            return res.json(related_item);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/:id', async (req, res, next) => {
    const { data } = req.body;
    const { id } = req.params;
    try {
        const related_item = await queries.update(data, id);
        if (related_item) {
            return res.json(related_item);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;