const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/about', control.aboutPage);

router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/profile', control.profile);

router.get('/disease_specific/:id', control.diseaseSpecific);

router.get('/home', control.homerevised);

router.get('/registration_form', control.registrationForm);

router.post('/api/submit', control.createDisease);

router.get('/api', control.createForm);

router.get('/getApi', control.findAllDisease);

router.get('/getApi/:id', control.displayData);

// Show add health fact page (Admin Page)
router.get('/addhealthfact', control.addHealthFactPage);

// Save Health Fact (Admin Page)
router.post("/addhealthfact/submit", control.saveHealthFact);

// Show add disease page (Admin Page)
router.get('/adddisease', control.addDiseasePage);

// Save Disease (Admin Page)
router.post('/adddisease/submit', control.saveDisease);

router.post('/profile', control.profile);

router.get('/currProfile', control.currProfile);

// restrict index for logged in user only
router.get('/', control.homerevised);

// route to register page
router.get('/register', control.register);

// route for register action
router.post('/registerSubmit', control.doRegister);

// route to login page
router.get('/login', control.login);

// route for login action
router.post('/loginSubmit', control.doLogin);

// route for logout action
router.get('/logout', control.logout);

router.get('/notlogged', control.logoutScreen);

module.exports = router;
