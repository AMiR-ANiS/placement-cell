// interview model

const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
