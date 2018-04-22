const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/home', control.realHome);

router.get('/users', control.printAll);

router.get('/users/:id', control.printUser);

router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/profile', control.profile);

router.get('/disease_specific', control.diseaseSpecific);

router.get('/', control.realHome)

router.get('/registration_form', control.registrationForm);

router.get('/navbar', control.navbar);

router.get('/footer', control.footer);

router.get('/disease_map', control.diseasemap);

module.exports = router;