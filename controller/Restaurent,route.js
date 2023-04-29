const express = require('express');
const { RestModel } = require('../model/restaurent.model');
const restaurant = express.Router()

// get all restaurant

restaurant.get('/restaurants', async (req, res) => {
    try {
        const rest = await RestModel.find();
        res.status(200).json(rest)
    } catch (error) {
        res.status(500).json({ message: 'Cannot get all restaurants' })
    }
})


// get single restaurent
restaurant.get('/restaurants/:id', async (req, res) => {
    const id = req.params.id
    try {
        const rest = await RestModel.findById(id);
        if (rest) {
            res.status(200).json(rest)
        } else {
            res.status(404).json({ message: 'Cannot find restaurant' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Cannot get  restaurants' })
    }
})
restaurant.get('/restaurants/:id/menu', async (req, res) => {
    const id = req.params.id
    try {
        const rest = await RestModel.findById(id);
        if (rest) {
            res.status(200).json(rest.menu)
        } else {
            res.status(404).json({ message: 'Cannot find restaurant' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Cannot get  restaurants' })
    }
})


// create normal restaurant
restaurant.post('/create', async (req, res) => {
    const {name, address , menu} = req.body;


    try {

        const rest = new RestModel({ name, address , menu});
        await rest.save()
        console.log(rest);
        res.status(201).json(rest)

    } catch (error) {
        res.status(201).json(error)
        console.log(error);
    }
})

// adding menu
restaurant.post('/restaurants/:id/menu', async (req, res) => {
    const { name, description, price, image } = req.body;
    const id = req.params.id;

    try {
        const rest = await RestModel.findById(id)
        const menuDish = { name, description, price, image };
        const newMenu = rest.menu.push(menuDish);
        console.log(rest.menu);
        await rest.save()
        console.log(newMenu.length);
        res.status(201).json(rest)

    } catch (error) {
        res.status(201).json(error)
        console.log(error);
    }
})

module.exports = { restaurant }