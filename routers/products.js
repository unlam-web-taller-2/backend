const express = require('express');
const router = express.Router();

const productos_controllers = require('../controllers/products_controller');

// Get productos
router.get('/', productos_controllers.get_products);

module.exports = router;