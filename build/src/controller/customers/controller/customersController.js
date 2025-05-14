"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = exports.cust = exports.customers = void 0;
const customerData_1 = require("../model/customerData");
const firebaseApi_1 = require("../../../modules/firebaseApi");
async function customers(req, res, next) {
    const customer = await (0, customerData_1.validateCustomerData)(req.body);
    if (customer) {
        res.status(200).json({ status: 'Customer validate successfully' });
    }
    else {
        res.status(503).json({ status: 'Customer validation fail' });
        ;
    }
}
exports.customers = customers;
async function cust(req, res, next) {
    let p = await (0, firebaseApi_1.getCustomers)();
    console.log(p);
    return res.status(200).json(p);
}
exports.cust = cust;
async function get(req, res, next) {
    let id = 0;
    try {
        id = Number(req.params.id);
    }
    catch (error) {
        console.error(error);
        return res.status(200).json({ 'error': error });
    }
    return res.status(200).json(await (0, firebaseApi_1.getCustomer)(id));
}
exports.get = get;
async function set(req, res, next) {
    const customer = await (0, customerData_1.validateCustomerData)(req.body);
    if (customer) {
        let ressults = await (0, firebaseApi_1.addCustomer)(req.body);
        return res.status(200).json(ressults);
    }
    else {
        return res.status(503).json({ status: '0', description: 'Customer validation fail' });
        ;
    }
}
exports.set = set;
