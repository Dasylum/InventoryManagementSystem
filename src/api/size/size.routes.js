const express = require('express');

const router = express.Router();

const Size = require('./size.model');

router.get('/', async (req, res, next) => {
    try {
        const size = await Size
            .query()
            .where('deleted_at', null);
        res.json(size);
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const size = await Size
            .query()
            .insert(req.body)
        res.json(size);
    } catch (error) {
        next(error)
    }
})


module.exports = router;