const express = require('express')
const { connection } = require('./config/db')
const { signup } = require('./controller/signup.route')
const { login } = require('./controller/login.route')
const { UpdatePass } = require('./controller/update_Password')
const { restaurant } = require('./controller/Restaurent,route')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome')
})

// Routes
app.use('/api', signup)
app.use('/api', login)
app.use('/api', UpdatePass)
app.use('/api', restaurant)

// Server
app.listen(5000, async () => {
    try {
        await connection
        console.log('connected to db');
        console.log('server is running on port 5000');
    } catch (error) {
        console.log(error);
        console.log('can not connect');
    }
})