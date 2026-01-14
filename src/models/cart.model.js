const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    
    cost:{
        type: Number,
        required: true
    }
},{timestamps:true, versionKey:false})

module.exports = mongoose.model("Cart", cartSchema)