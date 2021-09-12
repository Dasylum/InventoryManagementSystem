const express = require('express');

const router = express.Router();

const Billing = require('./billing.model');

router.get('/', async (req, res, next) => {
    try {
        const billing = await Billing
            .query()
            .where('deleted_at', null);
        res.json(billing);
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const billing = await Billing
            .query()
            .insert(req.body)
        res.json(billing);
    } catch (error) {
        next(error)
    }
})


module.exports = router;