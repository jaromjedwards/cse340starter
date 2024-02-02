//utilities/index.js

const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul class='nav'>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
 * Build the item view HTML
 * ************************************ */
Util.buildItem = async function (data) {

  let container = "<div class='item-container'>"
  
  container += '<img src=' + data[0].inv_image + ' alt="no picture found">' +
  '<h2>$' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</h2>' +
  '<h1>' + data[0].inv_make + '</h1>' +
  '<h2>' + data[0].inv_model + '</h2>' +
  '<p class="item-p">' + data[0].inv_description + '</p>' +
  '<h2>Color: ' + data[0].inv_color + '</h2>' +
  '<p class="item-p">Miles: ' + new Intl.NumberFormat('en-US').format(data[0].inv_miles) + '</p>' +
  "</div>"

  return container;
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display" class="inv-display-container">'
    data.forEach(vehicle => { 
      grid += '<li class="inv-display">'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<h2 class="car-name">'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.getLogin = async function(req, res, next) {

  let container = "<div class='login-container'>";

  // LOGIN FORM
  container += "<form class='form-container' action='#' method='post' id='loginForm'>";
  container += "  <label for='email'>Email:</label>";
  container += "  <input type='email' id='email' name='email' required>";
  container += "  <label for='password'>Password:</label>";
  container += "  <input type='password' id='password' name='password' pattern='^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{12,}$' title='Password must contain at least 12 characters, including at least one digit, one lowercase letter, one uppercase letter, and one special character. No spaces allowed.' required>";

  container += "  <button type='submit' class='account-button' >Login</button>";
  container += "</form>";

  container += "<p class='no-account'>No account? <a href='/account/registration'>Sign up</a></p>";

  container += "</div>";

  return container;
};

Util.getRegistration = async function(req, res, next) {
  let container = "<div class='register-container'>";

  // Adding the registration form
  container += "<form action='/account/registration' method='post' id='registrationForm' class='register-form'>";
  container += "  <label for='firstName'>First Name:</label>";
  container += "  <input type='text' id='firstName' name='firstName' required>";

  container += "  <label for='lastName'>Last Name:</label>";
  container += "  <input type='text' id='lastName' name='lastName' required>";

  container += "  <label for='email'>Email Address:</label>";
  container += "  <input type='email' id='email' name='email' required>";

  container += "  <label for='password'>Password:</label>";
  container += "  <input type='password' id='password' name='password' pattern='^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{12,}$' title='Password must contain at least 12 characters, including at least one digit, one lowercase letter, one uppercase letter, and one special character. No spaces allowed.' required>";

  container += "  <button class='account-button'>Register</button>";

  container += "</form>";

  container += "</div>";

  return container;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
