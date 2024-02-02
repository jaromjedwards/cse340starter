// controllers/accountController.js
const accountModel = require("../models/account-model"); 
const utilities = require("../utilities/")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  let login = await utilities.getLogin()
  res.render("account/login", {
    title: "Login",
    nav,
    login
  })
}

async function handleRegistration(req, res, next) {
  let nav = await utilities.getNav();

  if (req.method === 'GET') {
    // Render registration form
    let registration = await utilities.getRegistration();
    res.render("account/registration", {
      title: "Registration",
      nav,
      registration
    });
  } else if (req.method === 'POST') {
    // Process registration
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    );

    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      );
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      });
    } else {
      req.flash("notice", "Sorry, the registration failed.");
      res.status(501).render("account/registration", {
        title: "Registration",
        nav,
      });
    }
  } else {
    // Handle unsupported method
    res.status(405).send("Method Not Allowed");
  }
}


module.exports = { buildLogin, handleRegistration }