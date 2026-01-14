const cartModel = require("../models/cart.model")

exports.createNewCart = async (req, res )=>{
    req.body

    try{
        const totalItems = await cartModel.create({cost: req.body.cost})
        return res.status(201).send(totalItems)
    }catch(err){
        console.log(`we get error during items added to the cart ${err}`)
       return res.status(501).send({
            message: "internal error during creating cart"
        })
    }


}