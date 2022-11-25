// routes for managing employees

const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const passport = require('passport');

router.get('/sign-up', employeesController.signUp);
router.get('/sign-in', employeesController.signIn);
router.post('/new', employeesController.newEmployee);
router.get('/sign-out', employeesController.destroySession);
router.post(
  '/generate-session',
  passport.authenticate('local', { failureRedirect: '/employees/sign-in' }),
  employeesController.generateSession
);

module.exports = router;
