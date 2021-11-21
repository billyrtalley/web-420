//Title: WEB420 Assignment 5.2 Person API
//Author: William Talley
//Date: 21 November, 2021
//Description: During this assignment, the learning objective are to: create a new collection named people,
// add a new models directory and a new route's directory


//require statement for mongoose and assign it to a variable named mongoose
const mongoose = require("mongoose");

//Add a new variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

//Create a schema named roleSchema with text field with the String type
let roleSchema = new Schema ({ 
    text: { type: String },
});

//Create a schema named dependentSchema with firstName and lastName fields
let dependentSchema = Schema ({ 
    firstName: { type: String },
    lastName: { type: String },
});

//Create a schema named personSchema with firstName, lastName, roles, dependents, and birthDate fields
let personSchema = new Schema ({ 
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents:  [dependentSchema],
    birthDate: { type: String },
});

//Name the model “Person” and export it using module.exports
module.exports = mongoose.model('Person', personSchema);