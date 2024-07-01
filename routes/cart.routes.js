const cartController= require("../controller/cart.controller")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/carts", cartController.createNewCart)
}