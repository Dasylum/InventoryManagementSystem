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
const item_type = require('./item_type/item_type.routes');
const related_item = require('./related_item/related_item.routes');
const billing = require('./billing/billing.routes');
const cart = require('./cart/cart.routes');

const project = require('../constants/project');

const authMiddleware = require('../lib/jwt').verify;

const router = express.Router();

router.use('/states', authMiddleware, states);
router.use('/users', authMiddleware, users);
router.use('/auth', auth);
router.use('/address', authMiddleware, addresses);
router.use('/company', authMiddleware, company);
router.use('/size', authMiddleware, size);
router.use('/item', authMiddleware, item);
router.use('/countries', authMiddleware, countries);
router.use('/inventory_location', authMiddleware, inventory_location);
router.use('/item_image', authMiddleware, item_image);
router.use('/item_type', authMiddleware, item_type);
router.use('/related_item', authMiddleware, related_item);
router.use('/billing', authMiddleware, billing);
router.use('/cart', authMiddleware, cart);

router.get('/', (req, res) => {
    res.json({
        message: project.message
    })
})

module.exports = router;