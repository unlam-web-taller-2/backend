const express = require('express')
const router = express.Router()

const cart_controller = require('../controllers/cart_controller')

// POST add cart
router.post('/add_cart', cart_controller.add_cart_post)

// GET get user cart
router.get('/get_user_cart', cart_controller.get_user_cart_get)

// DELETE delete product from user cart
router.delete('/delete_product_from_cart', cart_controller.delete_product_from_user_delete)

module.exports = router;