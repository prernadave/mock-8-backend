const express = require('express');
const login = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
require('dotenv').config();




// ---------------------------------------Login---------------------------------
login.post('/login', async (req, res) => {
    try {
        const { email, password } = req.sbody;
        const user = await UserModel.findOne({ email })
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: "email or password doesn't exsit. Plaese create account first." })
        } else {
            const passMatch = await bcrypt.compare(password, user.password);
            if (!passMatch) {
                return res.status(401).json({ error: "email or password doesn't exsit. Plaese create account first." })
            }
            const token = jwt.sign({ userID: user._id }, process.env.key, { expiresIn: "1h" })
            console.log(token);
            return res.status(200).json({ token: token })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Can not login" })


    }
})

module.exports = {login}