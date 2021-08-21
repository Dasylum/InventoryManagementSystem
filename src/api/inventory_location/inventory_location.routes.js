const express = require('express');

const router = express.Router();

const queries = require('./inventory_location.queries');

router.get('/', async (req, res) => {
    const inventory_locations = await queries.find();
    res.json(inventory_locations);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const inventory_location = await queries.get(parseInt(id, 10) || 0);
        if (inventory_location) {
            return res.json(inventory_location);
        }
        return next();
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { data } = req.body;
    console.log(data)
    try {
        const inventory_location = await queries.post(data);
        if (inventory_location) {
            return res.json(inventory_location);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post('/:id', async (req, res, next) => {
    const { data } = req.body;
    const { id } = req.params;
    try {
        const inventory_location = await queries.update(data, id);
        if (inventory_location) {
            return res.json(inventory_location);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;