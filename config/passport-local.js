const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        let employee = await Employee.findOne({ email: email });

        if (!employee || employee.password !== password) {
          req.flash('error', 'Invalid username / password!');
          return done(null, false);
        } else {
          return done(null, employee);
        }
      } catch (err) {
        req.flash('error', 'Error in logging in!');
        return done(err);
      }
    }
  )
);

passport.serializeUser((employee, done) => {
  return done(null, employee.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let employee = await Employee.findById(id);
    return done(null, employee);
  } catch (err) {
    req.flash('error', err);
    return done(err);
  }
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/employees/sign-in');
  }
};

passport.setAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.employee = req.user;
  }
  next();
};

module.exports = passport;
