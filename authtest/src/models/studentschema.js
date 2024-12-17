const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    matric_number: { type: String, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true, minlength: 4 },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
