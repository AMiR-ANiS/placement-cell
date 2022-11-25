// controller for generating csv reports

const objectsToCSV = require('objects-to-csv');
const Student = require('../models/student');
const path = require('path');
const fs = require('fs');

module.exports.generate = async (req, res) => {
  try {
    let students = await Student.find({})
      .sort({ name: 1 })
      .populate({
        path: 'results',
        populate: {
          path: 'interview'
        }
      });

    const data = [];

    students.forEach((student) => {
      if (student.results.length === 0) {
        const obj = {
          ID: student._id.toString(),
          NAME: student.name,
          COLLEGE: student.college,
          BATCH: `${new Date(student.batch).toDateString().split(' ')[1]} ${
            new Date(student.batch).toDateString().split(' ')[3]
          }`,
          STATUS: student.status,
          'DSA FINAL SCORE': student.dsa,
          'WEB DEV FINAL SCORE': student.webd,
          'REACT FINAL SCORE': student.react,
          'INTERVIEW DATE': 'N. A.',
          'INTERVIEW COMPANY': 'N. A.',
          'INTERVIEW RESULT': 'N. A'
        };

        data.push(obj);
      } else {
        student.results.forEach((result) => {
          const obj = {
            ID: student._id.toString(),
            NAME: student.name,
            COLLEGE: student.college,
            BATCH: `${new Date(student.batch).toDateString().split(' ')[1]} ${
              new Date(student.batch).toDateString().split(' ')[3]
            }`,
            STATUS: student.status,
            'DSA FINAL SCORE': student.dsa,
            'WEB DEV FINAL SCORE': student.webd,
            'REACT FINAL SCORE': student.react,
            'INTERVIEW DATE': new Date(result.interview.date).toDateString(),
            'INTERVIEW COMPANY': result.interview.name,
            'INTERVIEW RESULT': result.result
          };

          data.push(obj);
        });
      }
    });

    const csvPath = path.join(
      __dirname,
      '..',
      process.env.PLCMNT_ASSET_PATH,
      'csv'
    );

    fs.existsSync(csvPath) || fs.mkdirSync(csvPath);
    const csv = new objectsToCSV(data);
    await csv.toDisk(path.join(csvPath, 'data.csv'));
    return res.render('csv', {
      title: 'Placement Cell | Download CSV'
    });
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};
