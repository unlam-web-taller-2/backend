const express = require('express');
const router = express.Router();

const products_controllers = require('../controllers/products_controller');

// Get products
router.get('/', products_controllers.get_products);

module.exports = router;