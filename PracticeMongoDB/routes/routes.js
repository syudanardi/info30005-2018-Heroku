var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

var bodyParser = require('body-parser');

// Need this to pass the JSON file into the database
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Show home page
router.get('/', controller.showingHome);

// Create a new Disease Wiki
//router.post('/', controller.createDiseaseWiki);

// Add disease to the database
router.post("/adddisease", controller.saveDiseaseData);

// // Create a new cafe
// router.post('/api', controller.createCafe);

// // Find all cafes
// router.get('/api', controller.findAllCafes);

// // Find one cafe by id
// router.get('/api/id/:id', controller.findOneCafe);



// List all disease wikis
//router.get('/test', controller.allDiseaseWiki);

// Show health fact page
router.get('/healthfact', controller.healthFactPage);

// // Save Health Fact
router.post("/addhealthfact", controller.saveHealthFact);

module.exports = router;

