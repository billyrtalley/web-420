//Title: WEB420 Assignment 6.2 NodeSecurity
//Author: William Talley
//Date: 28 November, 2021
//Description: session-routes.js is for setting up registering and resetting passwords


// Add requirement statements (express, router, User, and bcrypt)
const express = require('express');
const User = require('../models/talley-user');
const bcrypt = require('bcryptjs');
//create variable name routes and assign it to express.Router() function
const router = express.Router();
//Add a variable named saltRounds with an integer value of 10
const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: Signup
 *     summary: Register a new user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User added to MongoDB
 *       '401':
 *         description: Username already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/signup', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
               
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {

 //username is not in use already and the user is added to the database               
                if (!user) {
                    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //use the bcrypt package to hashSync() 

                    const newRegisteredUser = {
                        userName: req.body.userName,
                        password: hashedPassword,
                        emailAddress: req.body.emailAddress
                    };

                    User.create(newRegisteredUser, function(err, registeredUser) {
                        if (err) {
                            res.status(501).send({
                                'message': `MongoDB Exception: ${err}`
                            })
                        } else {
                            console.log(registeredUser);
                            res.json(registeredUser);
                        }
                    })
                } else {
                   
//username is already taken                    
                   
                    res.status(401).send({
                        'message': `Username: ${req.body.username} is already in use.`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);

//the password is compared to the body.password                
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

//user is logged in if the entered password is valid                    
                    if (passwordIsValid) {
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        
                        res.status(401).send({
                            'message': `Invalid username or password:`
                        })
                    }
                } else {
                    
                    res.status(401).send({
                        'message': `Invalid username or password.`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;
    
       


