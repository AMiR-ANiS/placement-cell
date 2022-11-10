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
  } catch (err) {
    req.flash('error', 'Error creating an interview!');
    return res.redirect('back');
  }
};
