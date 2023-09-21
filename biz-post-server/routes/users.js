const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const joi = require("joi");
const _=require("lodash");
const router = express.Router();

const userJoiSchema = joi.object({
   firstName:joi.string().required().min(2),
    lastName:joi.string().required().min(2),
    middleName:joi.string().allow(''),
    phone:joi.string().required().min(9),
    password:joi.string().required().min(8),
    email:joi.string().required().email(),
    imgUrl:joi.string().allow(''),
    imgAlt:joi.string().allow(''),
    state:joi.string().allow(''),
    country:joi.string().required().min(2),
    city:joi.string().required().min(2),
    street:joi.string().required().min(2),
    houseNumber:joi.number().required(),
    zip:joi.number().allow(''),
    role:joi.string().allow(''),
    favCards:joi.array()
})


// get all users
router.get("/", auth, async (req,res) => {
   try {
      const users = await User.find();
      res.status(200).send(users) 
   } catch (error) {
      res.status(400).send(error) 
   }
});

// get user by user - id
router.get("/:userId" ,auth, async(req,res) => {
    try {
       const user = await User.findById(req.params.userId).populate('favCards')
       res.status(200).send(user) 
    } catch (error) {
       res.status(400).send(error) 
    }
});

// add card to array favorite
router.put("/:userId/:cardId" , auth, async(req,res) => {
   try {
      const user = await User.findById(req.params.userId)
      const existingIdx = user.favCards.findIndex(card => card.toString() == req.params.cardId)
      if(existingIdx === -1) {
         user.favCards = [...user.favCards, req.params.cardId]
      } else {
         let cards = [...user.favCards]
         cards.splice(cards.findIndex(x => x == req.params.cardId), 1)
         user.favCards = cards
      }
      let updatedUser = await user.save()
      updatedUser = await User.findById(req.params.userId).populate("favCards")
      res.status(200).send(updatedUser) 
   } catch (error) {
      res.status(400).send(error)
   }
});

// PUT
router.put("/:id", auth, async(req,res) => {
   try {
      
      // 1. joi validation
      const {error} = userJoiSchema.validate(req.body)
      if (error) return res.status(400).send(error)

      // 2. check if user already exists
      let user = await User.findByIdAndUpdate({
       _id: req.params.id
      }, req.body, {new:true});

      if (!user) return res.status(400).send("User already exist");

      res.status(200).send(user);
   } catch (error) {
      res.status(400).send(error) 
   }
});


// DELETE user by id
router.delete("/:userId", auth, async(req,res) => {
   try {
      // check if user is admin or registerd user
      if (!req.payload.role == "Admin" && !req.payload._id == req.params.userId)
      return res.status(400).send("You do not have permission to delete")
   
      let user = await User.findByIdAndDelete({
       _id: req.params.userId
      })
      if (!user) return res.status(404).send("No such user");
      res.status(200).send("user deleted successfully");

   } catch (error) {
      res.status(400).send(error)
   }
}); 
  


module.exports = router;