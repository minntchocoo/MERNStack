require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/items')
const cors = require('cors');

// the express app
const app = express ()

// cors
app.use(cors());

// middleware
app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes 
app.use('/api/items', itemRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)

    // listen for request
app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
})


