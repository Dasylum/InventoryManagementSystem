const express = require('express');

const router = express.Router();

const Item = require('./item.model');

router.get('/', async (req, res, next) => {
    try {
        const item = await Item
            .query()
            .where('deleted_at', null);
        res.json(item);
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const item = await Item
            .query()
            .insert(req.body)
        res.json(item);
    } catch (error) {
        next(error)
    }
})


module.exports = router;