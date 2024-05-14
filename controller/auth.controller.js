const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secretCode = require("../config/auth.config")
/**
 * need to write the controller / logic to register
 */
exports.signup = async(req, res)=>{
    /**
     * logic to create the user
     */
    //1. Read the request body
    const requestBody = req.body

    //2.insert the dat in the users collection in mongoDB.
    const userObj ={
        name: requestBody.name,
        userID: requestBody.userID,
        email: requestBody.email,
        userType: requestBody.userType,
        password:bcrypt.hashSync(requestBody.password, 8)
    }
    try {
        const userCreated = await userModel.create(userObj)
        /**
         * return this user
         */
        const resObj ={
            name: userCreated.name,
            userID: userCreated.userID,
            email: userCreated.email,
            userType: userCreated.userType,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(resObj)

    } catch (error) {
        console.log(`Error while registering the user ${error}`);
        res.status(500).send({
            message: "Some error happened during registering the user"
        })
    }
    //3.Return the response to the user
}



exports.signin = async (req, res)=>{
    //check if userID present in the system
    const user =await userModel.findOne({userID:req.body.userID})

    if(user==null){
       return res.status(400).send({
            message: "userID passed it not a valid userID"
        })
    }

    //password is correct
    const isPasswordVallid = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordVallid){
       return res.status(401).send({
            message:"wrong password passed"
        })
    }

    //using jsw we will create the acess token with a given TTL(time to live) and return

    const token = jwt.sign({id:user.userID},secretCode.secret,{
        expiresIn:120
    })
    res.status(200).send({
        name:user.name,
        userID: user.userID,
        email:user.email,
        userType: user.userType,
        accessToken : token
    })
}