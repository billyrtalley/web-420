
// Title: Assignment 1.2 GitHub and Project Setup
// Author: William Talley
// Date: 24 October 2021
// Description: Setup of Github repository and adding
// the package .json file and app .js file 
// Directions for setup are from Bellevue University
//WEB420 RESTful APIs (author: Professor Richard Krasso)

//declaration: require statements for express, http, swagger-ui-express, swagger-jsdoc, and mongoose.
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc =require("swagger-jsdoc");
var composerAPI = require("./routes/talley-composer-routes");
var personAPI = require("./routes/talley-person-routes");
//added for assignment 6.2 11/28/2021
var userAPI = require('./routes/talley-session-routes')


// assignment: variable app assigned to express
var app = express();

//set the port to process.env.PORT || 3000
var port = process.env.PORT || 3000;

//set the app to use express.json()
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//add MongoDB connection (for assignment 4.2 11/14/2021)
const conn = "mongodb+srv://web420_user:buwebdev420@buwebdev-cluster-1.wmilj.mongodb.net/web420DB?retryWrites=true&w=majority";
mongoose
  .connect(conn, { 
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => { 
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  }).catch(err => { 
    console.log(`MongoDB Error: ${err.message}`);
  })


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
//added for assignment4.4 composer 
//added personAPI for assignment 5.2
app.use('/api', composerAPI, personAPI, userAPI);

//set up a message
//that let us know the application started on port 3002
http.createServer(app).listen(port, function () {
    console.log("The application started on port " + port + "!");
  });