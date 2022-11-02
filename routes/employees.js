const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');

router.get('/sign-up', employeesController.signUp);
router.get('/sign-in', employeesController.signIn);

module.exports = router;
