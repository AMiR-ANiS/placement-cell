module.exports.list = (req, res) => {
  return res.render('students', {
    title: 'Placement Cell | Students'
  });
};
