const express = require('express');

const router = express.Router();

const Cart = require('./cart.model');

router.get('/', async (req, res, next) => {
    try {
        const cart = await Cart
            .query()
            .where('deleted_at', null);
        res.json(cart);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const cart = await Cart
            .query()
            .where('billing_id', req.params.id);
        res.json(cart)
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        if(req.body && req.body.length>0){
            for(index in req.body){
                await Cart
                .query()
                .insert(req.body[index]);
            }
        }
        res.json({
            message: "Successfully added items in the cart."
        });
    } catch (error) {
        next(error)
    }
})


module.exports = router;