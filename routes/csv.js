// routes for generating csv

const express = require('express');
const router = express.Router();
const passport = require('passport');
const csvController = require('../controllers/csv');

router.get('/generate', passport.checkAuthentication, csvController.generate);

module.exports = router;
