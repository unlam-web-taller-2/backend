const db = require('../db/db');
const field_validator = require('../utils/validators');
const strings = require('../utils/strings');
const generate_responses = require('../utils/generate_responses');

exports.sign_in_post = (req, res) => {
    const f = (req, res) => {
        const { email, password } = req.body;

        if (field_validator.validate_sign_in(email, password)) {
            db.sign_in(email, password, (data) => {
                    if (data.length > 0) {
                        generate_responses.success(res, data[0], strings.sign_in_success);
                    } else {
                        generate_responses.error(res, strings.sign_in_error);
                    }
                }, (err) => {
                    generate_responses.error(res, err.error);
            });
        } else {
            generate_responses.error(res, strings.fields_no_valid);
        }
    }

    setTimeout(f, 500, req, res);
}

exports.sign_up_post = (req, res) => {
    const f = (req, res) => {
        const { email, password, name, lastname, address } = req.body;

        if (field_validator.validate_sign_up(email, password, name, lastname, address)) {
            db.sign_up(email, password, name, lastname, address, (data) => {
                generate_responses.success(res, data, strings.sign_up_success);
            }, (err) => {
                generate_responses.error(res, err.error);
            });
        } else {
            generate_responses.error(res, strings.fields_no_valid);
        }
    }

    setTimeout(f, 500, req, res);
}