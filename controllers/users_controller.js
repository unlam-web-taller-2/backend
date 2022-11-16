const db = require('../db/db');
const field_validator = require('../utils/validators');
const strings = require('../utils/strings');
const generate_responses = require('../utils/generate_responses');

exports.post_login = (req, res) => {
    const f = (req, res) => {
        const { email, password } = req.body;

        if (field_validator.validate_login(email, password)) {
            db.sign_in(email, password, (data) => {
                    if (data.length > 0) {
                        generate_responses.success(res, data[0], strings.login_success);
                    } else {
                        generate_responses.error(res, strings.register_error);
                    }
                }, (err) => {
                    console.log(err.error)
                    generate_responses.error(res, strings.default_error);
            });
        } else {
            generate_responses.error(res, strings.fields_no_valid);
        }
    }

    setTimeout(f, 500, req, res);
}

exports.post_register = (req, res) => {
    const f = (req, res) => {
        const { email, password, name, lastname, address } = req.body;

        if (field_validator.validate_register(email, password, name, lastname, address)) {
            db.sign_up(email, password, name, lastname, address, (data) => {
                generate_responses.success(res, data, strings.register_success);
            }, (err) => {
                console.log(err.error);
                generate_responses.error(res, strings.default_error);
            });
        } else {
            generate_responses.error(res, strings.fields_no_valid);
        }
    }

    setTimeout(f, 500, req, res);
}