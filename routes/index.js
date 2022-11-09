const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.use('/employees', require('./employees'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));
router.get('/', homeController.home);

module.exports = router;
