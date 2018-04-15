const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/', control.sayHello);

router.get('/users', control.printAll);

router.get('/users/:id', control.printUser);

router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/profile', control.profile);

module.exports = router;
