"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomerData = void 0;
const customerConvert_1 = require("./customerConvert");
function validateCustomerData(customerData) {
    let resulet = (0, customerConvert_1.isValidCustomerData)(customerData) ? true : false;
    return Promise.resolve(resulet);
}
exports.validateCustomerData = validateCustomerData;
