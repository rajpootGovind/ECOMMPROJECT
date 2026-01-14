const categoryModel = require("../models/category.model")
/**
 * controller for creating catogory
 * 
 * POST localhost:8008/ecomm/api/v1/auth/categories
 * {
    "name":"Household",
    "Description":"This will have all the household items"
    }
 */

    exports.createNewCategory = async(req,res)=>{
        //Read the req body
        //create the category object
        const categoryData = {
            name:req.body.name,
            description:req.body.description
        }
        try{
            //insert it to in mongodb
        const category= await categoryModel.create(categoryData)
        return res.status(201).send(category)

        }catch(err){
            console.log(`Error white creating category${err}`)
            return res.status(500).send({
                message:"error while creating categories"
            })
        }

        //return response of the created category
        
    }

   