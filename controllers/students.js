// students controller

const Student = require('../models/student');

// function for displaying list of students
module.exports.list = async (req, res) => {
  try {
    let students = await Student.find({}).sort({ name: 1 });
    return res.render('students', {
      title: 'Placement Cell | Students',
      students
    });
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// function for rendering new student form page
module.exports.newStudent = (req, res) => {
  return res.render('new_student_form', {
    title: 'Placement Cell | New Student'
  });
};

// function for creating a student record
module.exports.create = async (req, res) => {
  try {
    // check if student name entered is not empty
    if (req.body.name.length === 0) {
      req.flash('error', 'Student name cannot be empty!');
      return res.redirect('back');
    }

    // check if student's college entered is not empty
    if (req.body.college.length === 0) {
      req.flash('error', 'College name cannot be empty!');
      return res.redirect('back');
    }

    // check if batch is not empty
    if (req.body.batch.length === 0) {
      req.flash('error', 'Please specify batch!');
      return res.redirect('back');
    }

    // check if placement status is not empty
    if (!req.body.status) {
      req.flash('error', 'Please specify the placement status!');
      return res.redirect('back');
    }

    // check if dsa score is not entered
    if (req.body.dsa_score.length === 0) {
      req.flash('error', 'Please enter DSA score!');
      return res.redirect('back');
    }

    // check if web development score is not entered
    if (req.body.webd_score.length === 0) {
      req.flash('error', 'Please enter Web Development score!');
      return res.redirect('back');
    }

    // check if react score is not entered
    if (req.body.react_score.length === 0) {
      req.flash('error', 'Please enter React score!');
      return res.redirect('back');
    }

    // parse scores into int
    let dsa = parseInt(req.body.dsa_score);
    let webd = parseInt(req.body.webd_score);
    let react = parseInt(req.body.react_score);

    // check if scores are within the minimum and maximum limit
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
    req.flash('error', err);
    return res.redirect('back');
  }
};
