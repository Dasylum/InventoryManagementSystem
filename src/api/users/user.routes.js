const express = require('express');

const router = express.Router();

const User = require('./user.model');

router.get('/', async (req, res, next) => {
    try {
        const user = await User
            .query()
            .select('id', 'email', 'name', 'created_at', 'updated_at')
            .where('deleted_at', null);
        res.json(user);
    } catch (error) {
        next(error)
    }
});


module.exports = router;