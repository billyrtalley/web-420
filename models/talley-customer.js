//Title: WEB420 Assignment 7.2 NodeShopper
//Author: William Talley
//Date: 5 December, 2021
//Description: During this assignment, the learning objective are to: create a schema
// called lineItemSchema with name, price and quantity fields and create a schema named invoice
//with subtotal, tax, dateCreated, dateShipped, lineItems fields and a schema
//named customerSchema with firstName, lastName, userName and invoices fields
// add a new models directory and a new route's directory. The model
//will be named Customer and it will be exported using module.exports

//require statement for mongoose and assign it to a variable named mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create lineItemSchema
let lineItemSchema = new Schema ({ 
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
})

//create invoice Schema
let invoiceSchema = new Schema ({ 
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})

//create customerSchema
let customerSchema = new Schema({ 
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
})

//Export model using module.exports
module.exports = mongoose.model('Customer', customerSchema);
