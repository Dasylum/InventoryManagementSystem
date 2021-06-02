const express = require('express');

const states = require('./states/states.routes');
const users = require('./users/user.routes');
const auth = require('./auth/auth.routes');
const addresses = require('./address/address.routes');
const company = require('./company/company.routes');

const project = require('../constants/project');

const router = express.Router();

router.use('/states', states);
router.use('/users', users);
router.use('/auth', auth);
router.use('/address', addresses);
router.use('/company', company);

router.get('/', (req, res) => {
    res.json({
        message: project.message
    })
})

module.exports = router;