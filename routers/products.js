const express = require('express');
const router = express.Router();

const products_controllers = require('../controllers/products_controller');

// Get products
router.get('/', products_controllers.get_products);
router.get('/get_detail', products_controllers.get_product);

module.exports = router;