const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddProduct(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    data.brand = !isEmpty(data.brand) ? data.brand : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.stocks = !isEmpty(data.stocks) ? data.stocks : '';
    data.tag = !isEmpty(data.tag) ? data.tag : '';


    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = 'Price is required';
    }

    if (Validator.isEmpty(data.tag)) {
        errors.tag = 'Tag is required';
    }


    if (Validator.isEmpty(data.brand)) {
        errors.brand = 'Brand field is required';
    }

    if (Validator.isEmpty(data.type)) {
        errors.type = 'Type is invalid';
    }

    if (!Validator.isNumeric(data.stocks)) {
        errors.stocks = 'Stock number is invalid';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
};
