/*
Title: Assignment 9.2 Capstone API (routes.js file)
Author: William Talley
 Date: 12/19/2021
Description: capstone API routes
Source Reference: Bellevue University web-420 GitHub repository
Date Accessed: 15-19 December 2021
Source URL: https://github.com/buwebdev/web-420 
*/

// Add the appropriate requirement statements (express, router, and Team).
// Create four operations: findAllTeams, assignPlayerToTeam, findAllPlayersByTeamId, deleteTeam. 


const express = require("express");
const Team = require("../models/talley-capstone");
const router = express.Router();

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: createTeams adding a new team document to MongoDB Atlas
 *     summary: Creates a new team document
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *             properties:
 *              name:
 *                 type: string
 *              mascot:
 *                 type: string
 * 
 *     responses:
 *       '200':
 *         description: Team added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams', async(req, res) => {
    try {
        const newTeam = {
            name: req.body.name,
            mascot: req.body.mascot
        }

        await Team.create(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
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
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for showing an array of all teams.
 *     summary: Returns an array of Teams. 
 *     responses:
 *       '200':
 *         description: array of teams.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

 router.get('/teams', async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for adding a new player to mongo Atlas.
 *     summary: Creates a new player document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Player info
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              salary:
 *                 type: number
 * 
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams/:id/players', async(req, res) => {
    try {
        const newPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary,
        }

        Team.findOne({ _id: req.params.id }, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception ${err}`
                })
            } else if (!team) {
                res.status(401).send({ 
                    'message': `Invalid Team Id: ${req.params.id}`
                })
            } else {
                team.players.push(newPlayer);
                Team.updateOne(team, function(error, updatedTeam) {
                    if (err) {
                        console.log(err);
                        res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        })
                    }
            else {
                console.log(team.player);
                res.json(team.player);
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
});


/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning player on a team
 *     summary: Returns all player documents for a team by the team id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team Id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (!team){ 
                res.status(401).send({
                    'message': `Invalid Team Id: ${req.params.id}`
                })
                
            }
            
            else {
                console.log(team.players);
                res.json(team.players);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeam
 *     description: API for removing team document by Id.
 *     summary: Removes a Team document from MongoDB by teamId.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the team to delete.
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document 
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */


 router.delete('/teams/:id', async (req, res) => {
    try {

        Team.findByIdAndDelete({'_id': req.params.id}, function(err, team) {

            if(err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception ${err}`

                })
            } else if (!team){ 
                res.status(401).send({
                    'message': `Invalid Team Id: ${req.params.id}`
                })
            }
            
            else {
                console.log(team.player);
                res.json(team.player);
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