const mongoose = require('mongoose');
const restaurentSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{

        name: String,
        description: String,
        price: Number,
        image: String
    }]
})

const RestModel = mongoose.model('restaurent', restaurentSchema)
module.exports = { RestModel }

// "name": "Obroi Hotel",
//   "address": {
//     "street": "yoyo",
//     "city": "x",
//     "state": "y",
//     "country": "z",
//     "zip": "q"
//   },
//   "menu": [
//     {}
//   ]