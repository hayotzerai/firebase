"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomer = exports.getCustomer = exports.getCustomers = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../lib/firebase");
const getCustomers = async () => {
    console.log("Connectiong to firebase");
    const ref = (0, firestore_1.collection)(firebase_1.db, "customers");
    const snapshots = await (0, firestore_1.getDocs)(ref);
    return snapshots.docs;
};
exports.getCustomers = getCustomers;
const getCustomer = async (id) => {
    let customer = [];
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "customers"), (0, firestore_1.where)("id", "==", id));
    // Execute the query
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    // Check if any documents were returned
    if (querySnapshot.empty) {
        customer.push({ description: 'No matching document found in', status: '0' });
        return customer; // No document found
    }
    // Since we limited to 1, the first document in the snapshot is the one we want
    const docSnapshot = querySnapshot.docs[0];
    console.log(`Found document: ID = "${docSnapshot.id}"`);
    return JSON.stringify(docSnapshot.data());
};
exports.getCustomer = getCustomer;
const addCustomer = async (customerData) => {
    let customer = [];
    let id = Number(customerData['id']);
    let addCustomer = await isCustomerExists(id);
    // Check if any documents were returned
    if (addCustomer) {
        customer.push({ description: 'Customer already Exists in the database', status: '0' });
        return customer; // No document found
    }
    else {
        const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "customers"), customerData);
        customer.push({ description: 'Customer add suceessfully to the database', status: '1' });
    }
    return JSON.stringify(customer);
};
exports.addCustomer = addCustomer;
const isCustomerExists = async (id) => {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "customers"), (0, firestore_1.where)("id", "==", id));
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    const docSnapshot = querySnapshot.docs[0];
    console.log(docSnapshot);
    if (docSnapshot != undefined) {
        console.log(docSnapshot.data());
    }
    if (querySnapshot.empty) {
        return false;
    }
    return true;
};
