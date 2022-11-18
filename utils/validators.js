// Constants
const password_min_lenght = 6
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const password_regex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{6,}$/;

is_email_valid = (email) => {
    return email && email_regex.test(email);
}

is_password_valid = (password) => {
    return password && password_regex.test(password)
}

is_not_empty = (field) => {
    return field && field.length > 0
}

is_number = (field) => {
    return field && !Number.isNaN(field)
}

has_min_lenght = (field, minLenght) => {
    return field && field.length >= minLenght
}

exports.validate_login = (email, password) => {
    return is_email_valid(email, password) && is_password_valid(password)
}

exports.validate_register = (email, password, name, lastname, address) => {
    return is_email_valid(email) &&
            is_not_empty(password, password_min_lenght) &&
            is_not_empty(name) &&
            is_not_empty(lastname) &&
            is_not_empty(address)
}

exports.validate_add_cart = (user_id, product_id) => {
    return is_number(user_id) && is_number(product_id)
}

exports.validate_get_user_cart = (user_id) => {
    return is_number(user_id)
}

exports.validate_delete_product_from_user = (user_id, product_id) => {
    return is_number(user_id) && is_number(product_id)
}

exports.validate_verify = (email, code) => {
    return is_email_valid(email) && is_not_empty(code)
}