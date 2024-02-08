const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// GET all requests
router.get('/', requestController.getAllRequests);

// GET a single request by ID
router.get('/:id', requestController.getRequestById);

// POST a new request
router.post('/', requestController.createRequest);

// UPDATE an existing request
router.patch('/:id', requestController.updateRequest);

// DELETE a request
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
