const db = require('../db/db');
const generate_response = require('../utils/generate_responses');
const strings = require('../utils/strings');

exports.get_products = (req, res) => {
    db.get_all_products((data, err) => {
        if (err) {
            generate_response.error(res, strings.get_products_error);
        } else {
            generate_response.success(res, data, '')
        }
    });
}

exports.get_product = (req, res) => {
    const id = req.query.product_id
    console.log(id)

    db.get_product(id, (data) => {
        generate_response.success(res, data, '')
    }, (err) => {
        console.log(err)
        generate_response.error(res, strings.get_product_error)
    })
}