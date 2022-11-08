const express = require('express');
const router = express.Router();

const productos_controllers = require('../controllers/productsController');

// Get productos
router.get('/products', productos_controllers.productos_get);

module.exports = router;