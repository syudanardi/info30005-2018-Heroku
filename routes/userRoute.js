const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/', control.sayHello);

router.get('/home', control.homePage);

router.get('/users', control.printAll);

router.get('/users/:id', control.printUser);

<<<<<<< HEAD


module.exports = router;
=======
router.get('/diseases', control.diseaseWiki);

router.get('/disease/:id', control.disease);

router.get('/profile', control.profile);

module.exports = router;
>>>>>>> 06c0186c59e1344bc3af3597de793a6d1473f93c
