// employees controller

const Employee = require('../models/employee');

module.exports.signUp = (req, res) => {
  // if employee is logged in, redirect to home page
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('employee_sign_up', {
    title: 'Sign Up'
  });
};

module.exports.signIn = (req, res) => {
  // if employee is logged in, redirect to home page
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('employee_sign_in', {
    title: 'Sign In'
  });
};

module.exports.newEmployee = async (req, res) => {
  try {
    // if employee is logged in, redirect to home page
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }

    // check if name entered is not empty
    if (req.body.name.length === 0) {
      req.flash('error', 'Name cannot be empty!');
      return res.redirect('back');
    }

    // check if email entered is not empty
    if (req.body.email.length === 0) {
      req.flash('error', 'Email cannot be empty!');
      return res.redirect('back');
    }

    // check if password and confirm password matches
    if (req.body.password !== req.body.confirm_password) {
      req.flash('error', 'Password and confirm password should match!');
      return res.redirect('back');
    }

    // find an employee with the entered email
    let employee = await Employee.findOne({
      email: req.body.email
    });

    // if employee exists, cancel sign up and display error message else create employee account
    if (employee) {
      req.flash(
        'error',
        'Employee with that email has already been registered!'
      );
      return res.redirect('back');
    } else {
      await Employee.create(req.body);
      req.flash(
        'success',
        'Employee registered successfully!, Please log in to continue!'
      );
      return res.redirect('/employees/sign-in');
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// logout function
module.exports.destroySession = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Log out successful!');
    return res.redirect('/');
  });
};

// generate session function, display success message upon login
module.exports.generateSession = (req, res) => {
  req.flash('success', 'Log in successful!');
  return res.redirect('/');
};
