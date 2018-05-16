const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

// Restrict index for logged in user only
router.get('/', control.homerevised);

// Route to home page
router.get('/home', control.homerevised);

router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/disease_specific/:id', control.diseaseSpecific);

// Route to profile page
router.get('/profile', control.profile);

router.post('/profile', control.profile);

router.get('/currProfile', control.currProfile);

// Route to about us page
router.get('/about', control.aboutPage);

// Route to registration page
router.get('/registration_form', control.registrationForm);

// Route to register page
router.get('/register', control.register);

// Route for register action
router.post('/registerSubmit', control.doRegister);

// Route to login page
router.get('/login', control.login);

// Route for login action
router.post('/loginSubmit', control.doLogin);

// Route for logout action
router.get('/logout', control.logout);

router.get('/notlogged', control.logoutScreen);

router.post('/api/submit', control.createDisease);

router.get('/api', control.createForm);

// Show add health fact page (Admin Page)
router.get('/addhealthfact', control.addHealthFactPage);

// Save Health Fact (Admin Page)
router.post("/addhealthfact/submit", control.saveHealthFact);

// Show add disease page (Admin Page)
router.get('/adddisease', control.addDiseasePage);

// Save Disease (Admin Page)
router.post('/adddisease/submit', control.saveDisease);




module.exports = router;
