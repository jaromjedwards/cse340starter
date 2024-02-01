// routes/accountRoute.js
// needed resources
const express = require('express');
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")


// Route to controller
router.get('/login', accountController.buildLogin);
router.get('/registration', accountController.buildRegistration)
//
router.post('/registration', utilities.handleErrors(accountController.registerAccount))

module.exports = router;