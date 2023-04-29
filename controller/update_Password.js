const express = require('express');
const UpdatePass = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
const { auth } = require('../middleware/auth');
require('dotenv').config();

// "email": "Kiya@gmail.com",
// "password": "123456"
// localhost:5000/api/user/644cc5079f29fc8f1147066c/reset
// "oldPass": "123456",
// "newPass": "12345678"

// -------------------------Signup --------------------------------------------------

UpdatePass.put('/user/:id/reset', auth, async (req, res) => {
    const id = req.params.id;

    const { oldPass, newPass } = req.body;
    try {
        const user = await UserModel.findById(id);
        console.log(user);

        const matching = await bcrypt.compare(oldPass, user.password)
        if (!matching) {
            res.send({ message: "Please Provide correct password" })
        }

        const hashPass = await bcrypt.hash(newPass, 10)

        const updatedPassword = await UserModel.findByIdAndUpdate(id, { password: hashPass })
        res.json({ message: "Password Changed successfully!" })
        console.log(updatedPassword);
    } catch (error) {
        res.send({ message: "error occured while saving", error })
        console.log(error);
    }
})





module.exports = { UpdatePass }
