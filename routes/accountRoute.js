// routes/accountRoute.js
// needed resources
const regValidate = require('../utilities/account-validation')
const express = require('express');
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")


// Route to controller
router.get('/login', accountController.buildLogin);
router.get('/registration', accountController.handleRegistration)

router.post('/registration', regValidate.registationRules(),
regValidate.checkRegData,
utilities.handleErrors(accountController.registerAccount)
)


module.exports = router;