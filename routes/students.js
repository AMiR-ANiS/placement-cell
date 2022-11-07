const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const passport = require('passport');

router.get('/list', passport.checkAuthentication, studentsController.list);

module.exports = router;
