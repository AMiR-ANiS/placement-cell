module.exports.list = (req, res) => {
  return res.render('students', {
    title: 'Placement Cell | Students'
  });
};

module.exports.newStudent = (req, res) => {
  return res.render('new_student_form', {
    title: 'Placement Cell | New Student'
  });
};
