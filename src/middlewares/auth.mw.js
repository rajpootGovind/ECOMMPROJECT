const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secretCode = require("../config/auth.config")
/**
 * create a MW, which will check if the request body is proper and correct.
 */

const verifySignUpBody =async(req, res, next)=>{
    try {
        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                massage: " failed! name is not present in req body"
            }) 
        }
        //check fo the email
        if(!req.body.email){
            return res.status(400).send({
                massage: " failed! email is not present in req body"
            }) 
        }

        //check for userID
        if(!req.body.userID){
            return res.status(400).send({
                massage: " failed! userID is not present in req body"
            }) 
        }

        //check if user with the same userID is already present 
        const user =await userModel.findOne({userID:req.body.userID})
        if(user){
            return res.status(400).send({
                massage: " failed! user with same userID is already present "
            }) 
        }
     
        next()

    } catch (error) {
        console.log(`error while validating the request body ${error}`);
        res.status(500).send({
            message:"Error while validating the req body"
        })
        
    }
}

const verifySignInBody =async(req, res, next)=>{
    if(!req.body.userID){
        res.status(400).send({
            message:"userID is not provided"
        })
    }
    if(!req.body.password){
        res.status(400).send({
            message:"password is not provided"
        })
    }

    next()
}


//verify token- for creating categories

const verifyToken = (req, res, next)=>{
    //we will chech, token is present in header
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(201).send({
            message:"no token found! unAuthorised"
        });
    }
    //if it's a valid or not
    jwt.verify(token,secretCode.secret,async(err, decoded)=>{
        if(err){
          return res.status(401).send({
            message: "unAuthorised!"
          })
        }
        const user = await userModel.findOne({userID:decoded.id})
        if(!user){
            return res.status(400).send({
                message: "unAuthorised! this user for this token does't exist"
            })
        }
        //set the user info in the req body
        req.user = user
        next()
    } )
    

    //then move to the next step
}

//check for isAdmin...only admin can create category

const isAdmin = (req,res,next)=>{
    user = req.user
    if(user&&user.userType=="ADMIN"){
        next()
    }else{
        res.status(400).send({
            message:" only Admin users allow to access this end-point"
        })
    }
}


module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}