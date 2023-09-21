const mongoose = require("mongoose");

// creating schema
const cardSchema = new mongoose.Schema({
    userId:{
      type: String
    },
    title:{
      type: String,
      required: true
    }, 
    subTitle:{
      type: String,
      required: true
    }, 
    description:{
      type: String,
      required: true,
      maxlength: 250,
    }, 
    phone:{
      type: String,
      required: true,
      minlength: 9
    }, 
    email:{
      type: String,
      required: true,
      unique: true
    }, 
    web:{
       type: String, 
    }, 
    imageUrl:{
      type: String,
      required: true,
    }, 
    imageAlt:{
      type: String,
      required: true,
    }, 
    state:{
       type: String,
    }, 
    country:{
      type: String,
      required: true,
    },     
    city:{
      type: String,
      required: true,
    }, 
    street:{
      type: String,
      required: true,
    }, 
    houseNumber:{
      type: Number,
      required: true,
    }, 
    zip:{
      type: Number,  
    }, 
})

// creating model
const Card = mongoose.model("cards", cardSchema)
module.exports = Card;