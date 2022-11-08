const Student = require('../models/student');

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

module.exports.create = async (req, res) => {
  try {
    if (req.body.name.length === 0) {
      req.flash('error', 'Student name cannot be empty!');
      return res.redirect('back');
    }
    if (req.body.college.length === 0) {
      req.flash('error', 'College name cannot be empty!');
      return res.redirect('back');
    }

    let student = await Student.findOne({
      name: req.body.name
    });

    if (student) {
      req.flash('error', 'Student with that name already exists!');
      return res.redirect('back');
    } else {
      await Student.create({
        name: req.body.name,
        college: req.body.college,
        status: req.body.status,
        batch: new Date(req.body.batch),
        dsa: parseInt(req.body.dsa_score),
        webd: parseInt(req.body.webd_score),
        react: parseInt(req.body.react_score)
      });
      req.flash('success', 'Student record created successfully!');
      return res.redirect('/students/list');
    }
  } catch (err) {
    req.flash('error', 'Error creating new student record!');
    return res.redirect('back');
  }
};
