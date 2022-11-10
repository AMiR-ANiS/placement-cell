const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewsController = require('../controllers/interviews');

router.get('/list', passport.checkAuthentication, interviewsController.list);
router.get(
  '/new-interview-form',
  passport.checkAuthentication,
  interviewsController.newInterview
);
router.post(
  '/create',
  passport.checkAuthentication,
  interviewsController.create
);

module.exports = router;
