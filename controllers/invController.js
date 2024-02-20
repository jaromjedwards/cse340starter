const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}


// build Item
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)
  const container = await utilities.buildItem(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_make
  res.render("./inventory/vehicle", {
    title: className + " vehicles",
    nav,
    container,
    errors: null,
  })
}

invCont.buildAll = async function (req, res, next) {
  const data = await invModel.getAll()
  const container = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_make
  res.render("./inventory/vehicle", {
    title: className + " vehicles",
    nav,
    container,
    errors: null,
  })
}


module.exports = invCont