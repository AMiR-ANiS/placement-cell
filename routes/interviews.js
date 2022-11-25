// routes for managing interviews

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
router.get(
  '/allocate/:id',
  passport.checkAuthentication,
  interviewsController.allocateList
);
router.post(
  '/allocate',
  passport.checkAuthentication,
  interviewsController.allocate
);
router.get(
  '/students/:id',
  passport.checkAuthentication,
  interviewsController.studentsList
);
router.post(
  '/update',
  passport.checkAuthentication,
  interviewsController.update
);

module.exports = router;
