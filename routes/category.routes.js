
const CategoryController =require("../controller/category.controller")
const MW = require("../middlewares/auth.mw")
/**
 * POST:  localhost:8008/ecomm/api/v1/categories
 */
 module.exports= (app)=>{
    app.post("/ecomm/api/v1/categories",[MW.verifyToken, MW.isAdmin],CategoryController.createNewCategory)
}

