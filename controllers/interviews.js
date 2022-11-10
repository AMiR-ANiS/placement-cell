const Interview = require('../models/interview');

module.exports.list = (req, res) => {
  return res.render('interviews', {
    title: 'Placement Cell | Interviews'
  });
};

module.exports.newInterview = (req, res) => {
  return res.render('new_interview_form', {
    title: 'Placement Cell | Create New Interview'
  });
};

module.exports.create = async (req, res) => {
  try {
    if (req.body.company_name.length === 0) {
      req.flash('error', 'Company name cannot be empty!');
      return res.redirect('back');
    }

    if (req.body.interview_date.length === 0) {
      req.flash('error', 'Please specify an interview date!');
      return res.redirect('back');
    }

    let interview = await Interview.findOne({
      name: req.body.company_name.toUpperCase()
    });

    if (interview) {
      req.flash('error', 'Company interview already exists!');
      return res.redirect('back');
    } else {
      await Interview.create({
        name: req.body.company_name.toUpperCase(),
        date: req.body.interview_date
      });

      req.flash('success', 'Company interview scheduled successfully!');
      return res.redirect('/interviews/list');
    }
  } catch (err) {
    req.flash('error', 'Error creating an interview!');
    return res.redirect('back');
  }
};
