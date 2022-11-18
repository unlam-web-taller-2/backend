const db = require('../db/db');
const field_validator = require('../utils/validators');
const strings = require('../utils/strings');
const generate_responses = require('../utils/generate_responses');
const cognito_maneger = require('../utils/cognito_manager');

exports.post_login = (req, res) => {
    const { email, password } = req.body;

    if (field_validator.validate_login(email, password)) {
        cognito_maneger.login(email, password, (_) => {
            console.log(_)
            db.login(email, password, (data) => {
                if (data.length > 0) {
                    generate_responses.success(res, data[0], strings.login_success);
                } else {
                    generate_responses.error(res, strings.login_error_wrong_credentials);
                }
            }, (err) => {
                console.log(err)
                generate_responses.error(res, strings.default_error);
            });
        }, (err) => {
            switch (err.code) {
                case 'NotAuthorizedException': {
                    generate_responses.error(res, strings.login_error_wrong_credentials, err.code);
                    break;
                }
                case 'UserNotConfirmedException': {
                    generate_responses.error(res, strings.login_error_not_verified, err.code);
                    break;
                }
                default: {
                    generate_responses.error(res, strings.login_error);
                }
            }
        });
    } else {
        generate_responses.error(res, strings.fields_no_valid);
    }
}

exports.post_register = (req, res) => {
    const { email, password, name, lastname, address } = req.body;

    if (field_validator.validate_register(email, password, name, lastname, address)) {
        cognito_maneger.register(email, password, (_) => {
            db.register(email, password, name, lastname, address, (data) => {
                generate_responses.success(res, data, strings.register_success);
                }, (err) => {
                console.log(err.error);
                generate_responses.error(res, strings.default_error);
            });
        }, (err) => {
            switch (err.code) {
                case 'UsernameExistsException': {
                    generate_responses.error(res, strings.register_error_email_exists, err.code);
                    break
                }
                default: {
                    generate_responses.error(res, strings.default_error);
                }
            }
        });
    } else {
        generate_responses.error(res, strings.fields_no_valid);
    }
}

exports.post_verify = (req, res) => {
    const { email, code } = req.body;
    console.log(req.body)

    if (field_validator.validate_verify(email, code)) {
        cognito_maneger.verify(email, code, (data) => {
            generate_responses.success(res, strings.verify_success);
        }, (err) => {
            console.log(err.message)
            generate_responses.error(res, strings.verify_error);
        })
    } else {
        generate_responses.error(res, strings.fields_no_valid);
    }
}