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
    if (req.body.name.length === 0) {
      req.flash('error', 'Name cannot be empty!');
      return res.redirect('back');
    }

    if (req.body.email.length === 0) {
      req.flash('error', 'Email cannot be empty!');
      return res.redirect('back');
    }

    if (req.body.password !== req.body.confirm_password) {
      req.flash('error', 'Password and confirm password should match!');
      return res.redirect('back');
    }

    let employee = await Employee.findOne({
      email: req.body.email
    });

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
    req.flash('error', 'Sign up failed!');
    return res.redirect('back');
  }
};

module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash('success', 'Log out successful!');
  return res.redirect('/employees/sign-in');
};

module.exports.generateSession = (req, res) => {
  req.flash('success', 'Log in successful!');
  return res.redirect('/');
};
