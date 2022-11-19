const db = require('../db/db');
const generate_response = require('../utils/generate_responses');
const strings = require('../utils/strings');

exports.get_products = (req, res) => {
    db.get_all_products((data, err) => {
        if (err) {
            generate_response.error(res, strings.get_products);
        } else {
            generate_response.success(res, data, '')
        }
    });
}
