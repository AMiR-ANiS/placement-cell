// middleware for flash messages

module.exports.setFlash = (req, res, next) => {
  // set response locals flash as request flash
  res.locals.flash = {
    success: req.flash('success')[0],
    error: req.flash('error')[0]
  };

  next();
};
