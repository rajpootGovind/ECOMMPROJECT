const productController = require("../controller/product.controller")
const MW= require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/products",[MW.verifyToken, MW.isAdmin], productController.newProduct)
}