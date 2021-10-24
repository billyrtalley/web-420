
// Title: Assignment 1.2 GitHub and Project Setup
// Author: William Talley
// Date: 24 October 2021
// Description: Setup of Github repository and adding
// the package .json file and app .js file 
// Directions for setup are from Belleuve University
//WEB420 RESTful APIs (author: Professor Richard Krasso)

//declaration: require statements for express, http, swagger-ui-express, swagger-jsdoc, and mongoose.
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc =require("swagger-jsdoc");

// assignment: variable app assigned to express
var app = express();

//set the port to process.env.PORT || 3000
var port = process.env.PORT || 3002;

//set the app to use express.json()
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//define an object literal named options with the properties in the assignment instructions(exhibit C)
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "WEB 420 RESTful APIs",
        version: "1.0.0",
      },
    },
    apis: ["./routes/*.js"],
  };

//create a new variable name openapiSpecification and call the swaggerJsdoc library using the options object literal
const openapiSpecification = swaggerJsdoc(options);

//wire the openapiSpecification variable to the app variable
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//set up a message
//that let us know the application started on port 3002
http.createServer(app).listen(port, function () {
    console.log("The application started on port " + port + "!");
  });