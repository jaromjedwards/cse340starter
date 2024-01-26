// const itemModel = require("../models/item-model")
// const utilities = require("../utilities/")

// const itemCont = {}

// /* ***************************
//  *  Build item by classification view
//  * ************************** */
// itemCont.buildByClassificationId = async function (req, res, next) {
//   const classification_id = req.params.classificationId
//   const data = await itemModel.getItemByClassificationId(classification_id)
//   const grid = await utilities.buildClassificationGrid(data)
//   let nav = await utilities.getNav()
//   const className = data[0].classification_name
//   res.render("./item/classification", {
//     title: className + " vehicles",
//     nav,
//     grid,
//   })
// }

// module.exports = itemCont;