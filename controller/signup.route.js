const express = require('express');
const signup = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
require('dotenv').config();

signup.get('/', async (req, res) => {
    const data = await UserModel.find();
    res.send(data)
})

// -------------------------Signup --------------------------------------------------

signup.post('/register', async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const exist = await UserModel.findOne({ email: email })
        if (exist) {
            res.json({ message: 'User already exsists' })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new UserModel({ name, email, password: hashPass, address })
        await newUser.save()
        res.json({ message: "User registerd successfully!" })
        console.log(newUser);
    } catch (error) {
        res.send({ message: "error occured while saving", error: error })
        console.log(error);
    }
})





module.exports = { signup }
