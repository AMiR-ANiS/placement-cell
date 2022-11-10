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
