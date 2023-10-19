const express = require('express')
const{
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem
} = require('../controllers/itemController')

const router = express.Router()


// to GET all ITEMS
router.get('/', getItems)

// to GET a single ITEM
router.get('/:id', getItem)

// to POST a new ITEM
router.post('/', createItem)

// to DELETE an ITEM
router.delete('/:id', deleteItem)

// to UPDATE an ITEM
router.patch('/:id', updateItem)


module.exports = router 