"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.isValidCustomerData = void 0;
const isValidCustomerData = (value) => {
    if (value.name)
        return true;
    else
        return false;
};
exports.isValidCustomerData = isValidCustomerData;
function validate(customerData) {
    (0, exports.isValidCustomerData)(JSON.parse(customerData)) ? true : false;
}
exports.validate = validate;
