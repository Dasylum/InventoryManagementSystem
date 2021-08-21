const express = require('express');

const router = express.Router();

const queries = require('./countries.queries');

router.get('/', async (req, res) => {
    const countries = await queries.find();
    res.json(countries);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const country = await queries.get(parseInt(id, 10) || 0);
        if (country) {
            return res.json(country);
        }
        return next();
    } catch (error) {
        next(error);
    }
})


module.exports = router;