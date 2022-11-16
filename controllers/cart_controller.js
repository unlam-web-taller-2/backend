const db = require('../db/db')
const field_validator = require('../utils/validators')
const strings = require('../utils/strings')
const generate_response = require('../utils/generate_responses')

exports.add_cart_post = (req, res) => {
    const { user_id, product_id } = req.body

    if (field_validator.validate_add_cart(user_id, product_id)) {
        db.add_cart(user_id, product_id, (_) => {
            db.get_user_cart(user_id, (data) => {
                generate_response.success(res, data, strings.add_cart_sucess)
            }, (err) => {
                console.log(err)
                generate_response.error(res, strings.default_error)
            })
        }, (err) => {
            console.log(err.error)
            generate_response.error(res, strings.default_error)
        })
    } else {
        generate_response.error(res, strings.fields_no_valid)
    }
}

exports.get_user_cart_get = (req, res) => {
    const user_id = req.query.user_id

    if (field_validator.validate_get_user_cart(user_id)) {
        db.get_user_cart(user_id, (data) => {
            generate_response.success(res, data, strings.get_user_cart_success)
        }, (err) => {
            console.log(err)
            generate_response.error(res, strings.default_error)
        })
    } else {
        generate_response.error(res, strings.fields_no_valid)
    }
}

exports.delete_product_from_user_delete = (req, res) => {
    const user_id = req.query.user_id
    const product_id = req.query.product_id

    if (field_validator.validate_delete_product_from_user(user_id, product_id)) {
        db.delete_product_from_user_cart(user_id, product_id, (_) => {
            db.get_user_cart(user_id, (data) => {
                generate_response.success(res, data, strings.delete_product_from_user_cart_success)
            }, (err) => {
                console.log(err)
                generate_response.error(res, strings.default_error)
            })
        }, (err) => {
            console.log(err.error)
            generate_response.error(res, strings.default_error)
        })
    } else {
         generate_response.error(res, strings.fields_no_valid)
    }
}