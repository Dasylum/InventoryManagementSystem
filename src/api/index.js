const express = require('express');

const states = require('./states/states.routes');
const users = require('./users/user.routes');
const auth = require('./auth/auth.routes');
const addresses = require('./address/address.routes');
const company = require('./company/company.routes');
const size = require('./size/size.routes');
const item = require('./item/item.routes');
const countries = require('./country/countries.routes');
const inventory_location = require('./inventory_location/inventory_location.routes');
const item_image = require('./item_image/item_image.routes');

const project = require('../constants/project');

const router = express.Router();

router.use('/states', states);
router.use('/users', users);
router.use('/auth', auth);
router.use('/address', addresses);
router.use('/company', company);
router.use('/size', size);
router.use('/item', item);
router.use('/countries', countries);
router.use('/inventory_location', inventory_location);
router.use('/item_image', item_image)

router.get('/', (req, res) => {
    res.json({
        message: project.message
    })
})

module.exports = router;