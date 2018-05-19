const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

// Restrict index for logged in user only
router.get('/', control.home);

// Route to home page
router.get('/home', control.home);

router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/disease_specific/:id', control.diseaseSpecific);

// Route to profile page
router.get('/profile', control.profile);

router.post('/profile', control.profile);

router.post('/profile/submit', control.updateProfile);

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

router.post('/api/submit', control.createDisease);

router.get('/api', control.createForm);

// Show add Health Fact page (Admin Page)
router.get('/addhealthfact', control.addHealthFactPage);

// Save Health Fact (Admin Page)
router.post("/addhealthfact/submit", control.saveHealthFact);

// Show add Quick Quiz page (Admin Page)
router.get('/addquickquiz', control.addQuickQuizPage);

// Save Quick Quiz (Admin Page)
router.post("/addquickquiz/submit", control.saveQuickQuiz);

// Show add disease page (Admin Page)
router.get('/adddisease', control.addDiseasePage);

// Save Disease (Admin Page)
router.post('/adddisease/submit', control.saveDisease);

// Show add Location News page (Admin Page)
router.get('/addlocationnews', control.addLocationNewsPage);

// Save Location News (Admin Page)
router.post('/addlocationnews/submit', control.saveLocationNews);

// Show add Trending News page (Admin Page)
router.get('/addtrendingnews', control.addTrendingNewsPage);

// Save Trending News (Admin Page)
router.post('/addtrendingnews/submit', control.saveTrendingNews);

// Show add Outbreak News page (Admin Page)
router.get('/addoutbreaknews', control.addOutbreakNewsPage);

// Save Outbreak News (Admin Page)
router.post('/addoutbreaknews/submit', control.saveOutbreakNews);

// Show add Featured Videos page (Admin Page)
router.get('/addfeaturedvideo', control.addFeaturedVideoPage);

// Save Featured Videos(Admin Page)
router.post('/addfeaturedvideo/submit', control.saveFeaturedVideo);

module.exports = router;
