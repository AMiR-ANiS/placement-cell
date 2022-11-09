const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewsController = require('../controllers/interviews');

router.get('/list', passport.checkAuthentication, interviewsController.list);

module.exports = router;
