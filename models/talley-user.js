//Title: WEB420 Assignment 6.2 NodeSecurity
//Author: William Talley
//Date: 28 November, 2021
//Description: During this assignment, the learning objective are to: create a new collection named users,
// create a schema named UserSchema with userName, Password, emailAddress and name the new model
// User and export it using module.exports

//Require statements for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating schema with fields userName, Password, & emailAddress
let userSchema = new Schema ({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: Array },
});
//Export model using module.exports
module.exports = mongoose.model('User', userSchema);