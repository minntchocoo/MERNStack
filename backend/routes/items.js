const express = require('express')
const{
    createItem,
    getItems,
    getItem
} = require('../controllers/itemController')

const router = express.Router()


// to GET all ITEMS
router.get('/', getItems)

// to GET a single ITEM
router.get('/:id', getItem)

// to POST a new ITEM
router.post('/', createItem)

// to DELETE an ITEM
router.delete('/:id',(req, res) => {
    res.json({mssg: 'DELETE an item'})
})

// to UPDATE an ITEM
router.patch('/:id',(req, res) => {
    res.json({mssg: 'UPDATE an item'})
})


module.exports = router 