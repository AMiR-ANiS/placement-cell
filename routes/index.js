const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.use('/employees', require('./employees'));
router.get('/', homeController.home);

module.exports = router;