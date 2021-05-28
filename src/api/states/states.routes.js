const express = require('express');

const router = express.Router();

const queries = require('./states.queries');

router.get('/', async (req, res) => {
    const state = await queries.find();
    res.json(state);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const state = await queries.get(parseInt(id, 10) || 0);
        if (state) {
            return res.json(state);
        }
        return next();
    } catch (error) {
        next(error);
    }
})


module.exports = router;