/*
Title: Assignment 4.2 Composer API (routes.js file)
Author: William Talley
 Date: 11/7/2021
Description: Composer api routes
Source Reference: Bellevue University web-420 GitHub repository
Date Accessed: 11-14 November 2021
Source URL: https://github.com/buwebdev/web-420 
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/talley-composer');

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composers objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */


router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `Server Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(501).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 * 
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(401).send({
                    'message': `Composer Id is not valid: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API for updating an existing document in MongoDB
 *     summary: Updates a composer document by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the collection by 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// 12/12/2021
router.put('/composers/:id', async (req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(401).send({

                    'message': `Composer Id is not valid: ${err}`
                })
            } else {
                console.log(composer);
                composer.set({
                firstName: req.body.firstName,
                lastName: req.body.lastName
                })
                composer.save(function(err, updatedComposer) {
                    if (err) {
                        console.log(err);
                        res.json(updatedComposer);
                    } else {
                        console.log(updatedComposer);
                        res.json(updatedComposer);
                    }

                })
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
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposer
 *     description: API for deleting a document.
 *     summary: Removes a composer document from MongoDB
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer Document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
//12/12/2021

 router.delete('/composers/:id', async (req, res) => {
    try {

        Composer.findByIdAndDelete({'_id': req.params.id}, function(err, composer) {

            if(err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception ${err}`

                })
            } else {
               
                console.log(composer);
                res.json(composer);
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