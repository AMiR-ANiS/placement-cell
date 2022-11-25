// define passport local authentication strategy

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

// serialize user to decide which property to store in the cookie
passport.serializeUser((employee, done) => {
  return done(null, employee.id);
});

// deserialize the user from the cookie
passport.deserializeUser(async (id, done) => {
  try {
    let employee = await Employee.findById(id);
    return done(null, employee);
  } catch (err) {
    req.flash('error', err);
    return done(err);
  }
});

// middleware for checking if user is signed in
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/employees/sign-in');
  }
};

// middlware for setting the user in response locals if authenticated
passport.setAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.employee = req.user;
  }
  next();
};

module.exports = passport;
