//Title: WEB420 Assignment 4.2 Composer API
//Author: William Talley
//Date: 14 November, 2021
//Description: During this assignment, the learning objective are to: create a new database named web420DB and a collection named composers,
//create a new database user and name it web420_user, create a custom role named web420Role and assign it to the user web420_user,
// add a new directory under the root of your GitHub repository and name it models,
//add a new directory under the root of your GitHub repository and name it routes, and create the composer.js & composer-routes.js files


//require statement for mongoose and assign it to a variable named mongoose
const mongoose = require("mongoose");

//Add a new variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

//schema with firstName and lastName fields

let composerSchema = new Schema ({ 
    firstName: { type: String },
    lastName: { type: String },
});

//Name the model “Composer” and export it using module.exports
module.exports = mongoose.model('Composer', composerSchema);
