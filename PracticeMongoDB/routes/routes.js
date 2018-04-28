var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create a new cafe
router.post('/api', controller.createCafe);

// Find all cafes
router.get('/api', controller.findAllCafes);

// Find one cafe by id
router.get('/api/id/:id', controller.findOneCafe);

module.exports = router;

