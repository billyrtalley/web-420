/*
Title: Assignment 7.2 NodeShopper route.js file
Author: William Talley
 Date: 12/5/2021
Description: NodeShopper API routes; •	Create three operations: createCustomer (POST),
creatInvoiceByUserName (POST), and findAllInvoicesByUserName (GET)
Source Reference: Bellevue University web-420 GitHub repository
Date Accessed: 2-5 December 2021
Source URL: https://github.com/buwebdev/web-420 
*/


//require statements for Express, router and customer.js
const express = require('express');
const router = express.Router();
const Customer = require ('../models/talley-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customer
 *     name: createCustomer
 *     description: API to add a new customer to MongoDB
 *     summary: Creates a new customer document
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              userName:
 *                 type: string
 * 
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/customers', async(req, res) => { 
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }

        await Customer.create(newCustomer, function(err, customer) { 
            if(err) {
                res.status(501).send({ 
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customer
 *     name: createInvoiceByUserName
 *     description: Add new invoice 
 *     summary: Creates a new invoice document from userName
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer userName 
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *              subtotal:
 *                 type: string
 *              tax:
 *                 type: string
 *              dateCreated:
 *                 type: string
 *              dateShipped:
 *                 type: string
 *              lineItems:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *     responses:
 *       '200':
 *         description: Customer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/customers/:userName/invoices', async(req, res) => { 
    try {
        Customer.findOne({'userName': req.params.userName}, function(err, customer) { 
            if (err) {
                res.status(501).send({ 
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                const newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: req.body.lineItems
                };
                customer.invoices.push(newInvoice);
                customer.save(function(err, updatedCustomer) { 
                    if (err) {
                        req.status(501).send({ 
                            'message': `MongoDB Exception: ${err}`
                        })
                    } else { 
                        console.log(updatedCustomer);
                        res.json(updatedCustomer);
                    }
                })
            }
        })
    } catch (e) {
        res.status(500).send({ 
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customer                                    
 *     description: API for returning all invoices based on username. 
 *     summary: Display all invoices
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer Username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: array of invoices.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/customers/:userName/invoices', async(req,res) => {
    try{
        Customer.findOne({'userName': req.params.userName}, function(err, customer) { 
            if(err) { 
                res.status(500).send({ 
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.status(200).send(customer.invoices)
            }
        })
    } catch (e) { 
        res.status(501).send({ 
            'message': `MongoDB Exception ${e.message}`
        })
    }
})

// Export the router using module.exports
module.exports = router;