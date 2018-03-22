const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/', control.sayHello);

router.get('/users', control.printAll);

router.get('/users/:id', control.printUser);

module.exports = router;