const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    batch: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['placed', 'not_placed'],
      required: true
    },
    dsa: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    webd: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    react: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
