const productModel = require("../models/product.model")

exports.newProduct = async(req, res)=>{
    //read the body
    const product = req.body

    // insert product data in collection inside the DB

    try{
        const productData= await productModel.create({
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description
        })
       return res.status(201).send(productData)
    }catch(err){
        console.log(`error during product adding: ${err}`);
        return res.status(500).send({
            message: "erroe during product adding"
        })
    }
}