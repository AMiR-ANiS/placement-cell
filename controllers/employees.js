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
