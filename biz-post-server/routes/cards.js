const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Card = require("../models/Card");
const _=require("lodash");
const router = express.Router();

const cardJoiSchema = joi.object({
    userId: joi.string(),
    title: joi.string().required(),
    subTitle: joi.string().required(),
    description: joi.string().required().max(250),
    phone: joi.string().required().min(9),
    email: joi.string().required().email(),
    web: joi.string().allow(''),
    imageUrl: joi.string().required(),
    imageAlt: joi.string().required(),
    state: joi.string().allow(''),
    country: joi.string().required(),
    city: joi.string().required(),
    street: joi.string().required(),
    houseNumber: joi.number().required(),
    zip: joi.number().allow('') 
})



// post card
router.post("/", auth, async (req,res) => {
    try {
        // 1. check if user is an admin or business
        if (!req.payload.role == "Admin" && !req.payload.role == "Business")
        return res.status(400).send("Access denied. User is not an admin or business");
       
        // 2. joi validation
        const {error} = cardJoiSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        
        // 3. check if card already exists
        let card = await Card.findOne({
            title: req.body.title,
            subTitle: req.body.subTitle,
            phone: req.body.phone,
        });

        if (card) return res.status(400).send("Card already exists")

        // 4. add card
        card = new Card(req.body);
        await card.save();

        // 5. return new card details
        res.status(201).send(card);

    } catch (error) {
        res.status(400).send(error)
    }
});


// get all
router.get("/", async (req,res) => {
    try {
       const cards = await Card.find();
       res.status(200).send(cards) 
    } catch (error) {
       res.status(400).send(error) 
    }
});

// get card by user-id
router.get("/by-userid/:userId", auth, async(req,res) => {
    const {userId} = req.params;
    try {
        const cards = await Card.find({
            userId
        });

        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error)
    }
})



// get card details
router.get("/card-details/:cardId" , async(req,res) => {
    try {
        const card = await Card.findById(req.params.cardId)
        res.status(200).send(_.pick(card,[ 
        "imageUrl",
        "imageAlt",  
        "title" ,
        "subTitle",
        "description",
        "web",
        "phone",
        "email",
        "country",
        "city",
        "street",
        "houseNumber"]))
    } catch (error) {
       res.status(400).send(error) 
    }
})

// DELETE card by id
router.delete("/:cardId", auth, async(req,res) => {
    try {
       // check if user is admin or business
       if (!req.payload.role == "Admin" && !req.payload.role == "Business")
       return res.status(400).send("You do not have permission to delete")
    
       let card = await Card.findByIdAndDelete({
        _id: req.params.cardId
       })
       if (!card) return res.status(404).send("No such card");
       res.status(200).send("card deleted");

    } catch (error) {
       res.status(400).send(error)
    }
}); 

// PUT
router.put("/my-cards/update/:id", auth, async(req,res) => {
    try {
       // 1. check if user is admin or business
       if (!req.payload.role == "Admin" && !req.payload.role == "Business")
       return res.status(400).send("You do not have permission to update") 

       // 2. joi validation
       const {error} = cardJoiSchema.validate(req.body)
       if (error) return res.status(400).send(error)

       // 3. check if product already exists
       let card = await Card.findByIdAndUpdate({
        _id: req.params.id
       }, req.body, {new:true});

       if (!card) return res.status(400).send("Card already exist");

       res.status(200).send(card);
    } catch (error) {
       res.status(400).send(error) 
    }
});

module.exports = router;
