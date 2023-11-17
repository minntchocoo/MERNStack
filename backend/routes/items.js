const express = require('express')
const{
    addItem,
    deleteItem,
    getAllItems,
    getSingleItem,
    updateItem,
} = require('../controllers/itemController')

const router = express.Router()


// to GET all ITEMS
router.get('/', getAllItems)

// to GET a single ITEM
router.get('/:id', getSingleItem)

// to POST a new ITEM
router.post('/', addItem)

// to DELETE an ITEM
router.delete('/:id', deleteItem)

// to UPDATE an ITEM
router.patch('/:id', updateItem)


module.exports = router 