// result mapping between student and interview model

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Interview'
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Student'
    },
    result: {
      type: String,
      required: true,
      enum: ['pass', 'fail', 'did_not_attempt', 'on_hold'],
      default: 'on_hold'
    }
  },
  {
    timestamps: true
  }
);

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
