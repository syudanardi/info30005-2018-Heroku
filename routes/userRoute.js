const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/', control.sayHello);

router.get('/home', control.homePage);

router.get('/users', control.printAll);

router.get('/users/:id', control.printUser);

router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/profile', control.profile);

router.get('/disease_specific', control.diseaseSpecific);

router.get('/registration_form', control.registrationForm);

router.get('/navbar', control.navbar);

router.get('/footer', control.footer);

module.exports = router;