/**
 * this is the staring file of the project.
 */

const express = require("express")
const mongoose = require("mongoose")
const serverConfig=require("./config/server.config")
const userModel= require("./models/user.model")
const dbConfig =require("./config/db.config")
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json()) //middleware- for understatnd json format data bcz it understand only js object



/**
 * create an Admin user at the starting of the application 
 * if already not present
 */

/**
 * Connection with mongoDB database
 */
mongoose.connect(dbConfig.dbURL)
const db =mongoose.connection

db.on("error",()=>{
    console.log(`error while connecting to db: ${error}`);
})

db.once("open",()=>{
     console.log("db connected successfully");
     init()
})

async function init(){
  //check if user present or not.
  let user =  await userModel.findOne({userID:"admin"})
  if(user){
    console.log("Admin already present");
    return;
  }
  try{
    user = await userModel.create({
        name:"Govind",
        userID:"admin",
        email: "hitgo@gmail.com",
        userType:"ADMIN",
        password:bcrypt.hashSync("welcome1",8)
    })
     console.log(`admin created ${user}`);

  }catch(err){
    console.log(`error during creating Admin ${err}`);
  }
}

/**
 * stich the route to the server
 */
require("./routes/auth.routes")(app)// calling routes and passing app object
 
//for category
require("./routes/category.routes")(app)



/**
 * start the server
 */
app.listen(serverConfig.PORT,()=>{
    console.log(`server is running on port no.:${serverConfig.PORT}`);
})