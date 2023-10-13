const express = require('express')
const Item = require('../models/itemModel')

const router = express.Router()


// to GET all ITEMS
router.get('/', (req, res) => {
    res.json({mssg: 'GET all items'})
})

// to GET a single ITEM
router.get('/:id', (req, res) => {
    res.json({mssg: ' GET a single item'})
})

// to POST a new ITEM
router.post('/', async (req, res) => {
    const{name, variation, count} = req.body

    try{
        const item = await Item.create({name, variation, count})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
})

// to DELETE an ITEM
router.delete('/:id',(req, res) => {
    res.json({mssg: 'DELETE an item'})
})

// to UPDATE an ITEM
router.patch('/:id',(req, res) => {
    res.json({mssg: 'UPDATE an item'})
})


module.exports = router 