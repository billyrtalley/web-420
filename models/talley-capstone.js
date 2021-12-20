/*
Title: Assignment 9.2 Capstone API (routes.js file)
Author: William Talley
 Date: 12/19/2021
//Description: During this assignment, the learning objective are to: create a new collection named capstone,
//a new teamSchema (name, mascot and players) and
// create a schema named playerSchema with firstname, lastName, and salary
// User and export it using module.exports
Source Reference: Bellevue University web-420 GitHub repository
Date Accessed: 15-19 December 2021
Source URL: https://github.com/buwebdev/web-420 
*/

// Add the appropriate requirement statements (express, router, and Capstone).
// Create a variable named router and assign it the express.Router() function.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playerSchema = new Schema ({ 
    firstName: { type: String },
    lastName: { type : String },
    salary: { type: Number },
});

let teamSchema = new Schema ({ 
    name: { type: String},
    mascot: { type: String},
    players: [playerSchema],
});

module.exports = mongoose.model('Team', teamSchema);
