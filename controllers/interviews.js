// interviews controller

const Interview = require('../models/interview');
const Student = require('../models/student');
const Result = require('../models/result');

// function for rendering list of interviews
module.exports.list = async (req, res) => {
  try {
    let interviews = await Interview.find({}).sort({ name: 1 });
    return res.render('interviews', {
      title: 'Placement Cell | Interviews',
      interviews
    });
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// function for rendering new interview form page
module.exports.newInterview = (req, res) => {
  return res.render('new_interview_form', {
    title: 'Placement Cell | Create New Interview'
  });
};

// function for creating an interview
module.exports.create = async (req, res) => {
  try {
    // check if company name entered is not empty
    if (req.body.company_name.length === 0) {
      req.flash('error', 'Company name cannot be empty!');
      return res.redirect('back');
    }

    // check if interview date is not entered
    if (req.body.interview_date.length === 0) {
      req.flash('error', 'Please specify an interview date!');
      return res.redirect('back');
    }

    // find an interview with the given company and date
    let interview = await Interview.findOne({
      name: req.body.company_name.toUpperCase(),
      date: new Date(req.body.interview_date)
    });

    // if interview exists, don't create interview and display error message, if not exists then schedule an interview
    if (interview) {
      req.flash(
        'error',
        'Company interview on the given date is already scheduled!'
      );
      return res.redirect('back');
    } else {
      await Interview.create({
        name: req.body.company_name.toUpperCase(),
        date: new Date(req.body.interview_date)
      });

      req.flash('success', 'Company interview scheduled successfully!');
      return res.redirect('/interviews/list');
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// function for rendering list of students for allocation to an interview
module.exports.allocateList = async (req, res) => {
  try {
    // find an interview with the interview id passed as request parameter
    let interview = await Interview.findById(req.params.id);

    // if interview does not exist, display error message
    if (!interview) {
      req.flash('error', 'Interview does not exist!');
      return res.redirect('back');
    }
    await interview.populate('results');

    // get list of allocated student ids for the interview
    let checkedStudentIDs = interview.results.map((result) => result.student);

    // get list of allocated students
    let checkedStudents = await Student.find({
      _id: { $in: checkedStudentIDs }
    });

    // get list of unallocated students
    let uncheckedStudents = await Student.find({
      _id: { $nin: checkedStudentIDs }
    });

    // total number of students
    let length = checkedStudents.length + uncheckedStudents.length;

    return res.render('allocate.ejs', {
      title: 'Placement Cell | Allocate Students',
      checkedStudents,
      uncheckedStudents,
      interview,
      length
    });
  } catch (err) {
    req.flash('error', err);
    console.log(err);
    return res.redirect('back');
  }
};

// function for allocating students for an interview
module.exports.allocate = async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      if (req.body[i]) {
        let student = await Student.findById(req.body[i]);
        let interview = await Interview.findById(req.body.interview);
        if (!student || !interview) {
          req.flash('error', 'Student or interview does not exist!');
          return res.redirect('back');
        }

        let result = await Result.findOne({
          student: req.body[i],
          interview: req.body.interview
        });

        if (!result) {
          let result = await Result.create({
            interview: req.body.interview,
            student: req.body[i],
            result: 'on_hold'
          });

          student.results.push(result);
          await student.save();

          interview.results.push(result);
          await interview.save();
        }
      }
    }

    req.flash('success', 'Students allocated successfully!');
    return res.redirect('/interviews/list');
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// function for viewing list of allocated students for an interview
module.exports.studentsList = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id);

    if (!interview) {
      req.flash('error', 'Interview does not exist!');
      return res.redirect('back');
    }

    await interview.populate({
      path: 'results',
      populate: {
        path: 'student'
      }
    });

    return res.render('interview_students', {
      title: 'Placement Cell | List of allocated students',
      interview
    });
  } catch (err) {
    req.flash('error', err);
    console.log(err);
    return res.redirect('back');
  }
};

// function for updating students result status for interviews
module.exports.update = async (req, res) => {
  try {
    for (let key in req.body) {
      let result = await Result.findById(key);

      if (!result) {
        req.flash('error', 'Result ID does not exist!');
        return res.redirect('back');
      }

      result.result = req.body[key];
      await result.save();
    }
    req.flash('success', 'Result status updated successfully!');
    return res.redirect('/interviews/list');
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};
