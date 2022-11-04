const Employee = require('../models/employee');

module.exports.signUp = (req, res) => {
  return res.render('employee_sign_up', {
    title: 'Sign Up'
  });
};

module.exports.signIn = (req, res) => {
  return res.render('employee_sign_in', {
    title: 'Sign In'
  });
};

module.exports.newEmployee = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      req.flash('error', 'password and confirm password mismatch!');
    }

    return res.redirect('back');
  } catch (err) {
    req.flash('error', 'Sign up failed!');
    return res.redirect('back');
  }
};
