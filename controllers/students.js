const Student = require('../models/student');

module.exports.list = async (req, res) => {
  try {
    let students = await Student.find({}).sort({ name: 1 });
    return res.render('students', {
      title: 'Placement Cell | Students',
      students
    });
  } catch (err) {
    req.flash('error', 'Error rendering students list!');
    return res.redirect('back');
  }
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

    if (req.body.batch.length === 0) {
      req.flash('error', 'Please specify batch!');
      return res.redirect('back');
    }

    if (!req.body.status) {
      req.flash('error', 'Please specify the placement status!');
      return res.redirect('back');
    }

    if (req.body.dsa_score.length === 0) {
      req.flash('error', 'Please enter DSA score!');
      return res.redirect('back');
    }

    if (req.body.webd_score.length === 0) {
      req.flash('error', 'Please enter Web Development score!');
      return res.redirect('back');
    }

    if (req.body.react_score.length === 0) {
      req.flash('error', 'Please enter React score!');
      return res.redirect('back');
    }

    let dsa = parseInt(req.body.dsa_score);
    let webd = parseInt(req.body.webd_score);
    let react = parseInt(req.body.react_score);

    if (dsa < 0 || dsa > 100) {
      req.flash('error', 'DSA score must be within 0 - 100');
      return res.redirect('back');
    }

    if (webd < 0 || webd > 100) {
      req.flash('error', 'Web Dev score must be within 0 - 100');
      return res.redirect('back');
    }

    if (react < 0 || react > 100) {
      req.flash('error', 'React score must be within 0 - 100');
      return res.redirect('back');
    }

    await Student.create({
      name: req.body.name.toUpperCase(),
      college: req.body.college,
      status: req.body.status,
      batch: new Date(req.body.batch),
      dsa,
      webd,
      react
    });
    req.flash('success', 'Student record created successfully!');
    return res.redirect('/students/list');
  } catch (err) {
    req.flash('error', 'Error creating new student record!');
    return res.redirect('back');
  }
};
