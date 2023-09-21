const chalk = import("chalk").then(m=>m.default);
const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

async function writeError(error){
    const _chalk = await chalk;
    console.log(_chalk.red("Data must be checked again"));
  }

const registerSchema = joi.object({
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

router.post("/" , async(req,res) => {
    try {
        // 1. joi validation
        const {error} = registerSchema.validate(req.body);
        if (error){
            writeError(error)
            return res.status(400).send(error)
        }

        // 2. check if user already exist
        let user = await User.findOne({email: req.body.email})
        if (user) return res.status(400).send("User already exist!")

        // 3. create the user
        user = new User(req.body);

        // 4. encrypt the password
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt)

        // 5. save user after encrypting the password
        await user.save();

        // 6. creating the token
        const token = jwt.sign(
            {_id: user._id ,
            role: user.role,
            email: user.email} ,
            process.env.jwtKey);

        // 7. return response with token
        res.status(201).send(token);
        
    } catch (error) {
        writeError(error)
        res.status(400).send(error)
    }
});

module.exports = router;

