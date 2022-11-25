// routes for managing students

const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const passport = require('passport');

router.get('/list', passport.checkAuthentication, studentsController.list);
router.get(
  '/new-student-form',
  passport.checkAuthentication,
  studentsController.newStudent
);
router.post('/create', passport.checkAuthentication, studentsController.create);

module.exports = router;
