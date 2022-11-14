// Constants
const field_not_empty = 1
const password_min_lenght = 6
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

validate_email = (email) => {
    return email !== null && email_regex.test(email);
}

has_min_lenght = (field, minLenght) => {
    return field !== null && field.length >= minLenght
}

exports.validate_sign_in = (email, password) => {
    return validate_email(email, password) && has_min_lenght(password, password_min_lenght)
}

exports.validate_sign_up = (email, password, name, lastname, address) => {
    return validate_email(email) &&
            has_min_lenght(password, password_min_lenght) &&
            has_min_lenght(name, field_not_empty) &&
            has_min_lenght(lastname, field_not_empty) &&
            has_min_lenght(address, field_not_empty)
}