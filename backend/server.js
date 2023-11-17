require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/items')
const imageRoutes = require('./routes/imageRoute')
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
app.use('/api/image', imageRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)

    // listen for request
app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
})


