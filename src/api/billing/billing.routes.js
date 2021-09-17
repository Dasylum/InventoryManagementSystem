const express = require('express');

const router = express.Router();

const Billing = require('./billing.model');
const Customer = require('../customer/customer.model');
const Address = require('../address/address.model');

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
        const { customer_id } = req.body;

        if(!customer_id){
            const { address_id } = req.body.customer;

            if(!address_id){
                const address = await Address
                .query()
                .insert(req.body.customer.address);

                req.body.customer.address_id = address.id;
                delete req.body.customer.address;
            }
            
            const customer = await Customer
                .query()
                .insert(req.body.customer);
            
            req.body.customer_id = customer.id;
            delete req.body.customer;
        }
        req.body.user_id = 1;

        const billing = await Billing
            .query()
            .insert(req.body);

        res.json(billing);

    } catch (error) {
        next(error)
    }
})


module.exports = router;