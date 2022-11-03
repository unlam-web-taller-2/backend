const express = require('express');
const router =express.Router();

const productos_controllers = require('../controllers/productosControllers');

// Get productos
router.get('/productos', productos_controllers.productos_get);

module.exports = router;