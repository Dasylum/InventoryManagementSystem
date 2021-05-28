const express = require('express');

const router = express.Router();

const Address = require('./address.model');

router.get('/', async (req, res, next) => {
    try {
        const address = await Address
            .query()
            .where('deleted_at', null);
        res.json(address);
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        [
            'street_address_1',
            'street_address_2',
            'city',
            'zipcode'
        ].forEach((prop) => {
            if (req.body[prop]) {
                req.body[prop] = req.body[prop].toString().toLowerCase().trim();
            }
        })
        const address = await Address
            .query()
            .insert(req.body)
        res.json(address);
    } catch (error) {
        next(error)
    }
})


module.exports = router;