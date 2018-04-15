const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/', control.sayHello);

router.get('/home', control.homePage);

router.get('/users', control.printAll);

router.get('/users/:id', control.printUser);

router.get('/disease_specific', control.diseaseSpecific);

router.get('/registration_form', control.registrationForm);

router.get('/navbar', control.navbar);

module.exports = router;