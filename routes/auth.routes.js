
/**
 * POST localhost:8088/ecomm/api/v1/auth/signup
 * 
 * need to intercept this
 */
const authController = require("../controller/auth.controller")
const authMW = require("../middlewares/auth.mw")


module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)// mw place b/w the routes and controller


 /**
 * Routes for POST localhost:8088/ecomm/api/v1/auth/signin
 */
app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody], authController.signin)
}

