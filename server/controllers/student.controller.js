const { asyncHandler } = require("../middlewares");
const { Student, Certificate } = require("../models");

exports.getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.findAll({ order: [["createdAt", "DESC"]] });
  res.status(200).json({ students });
});

exports.newStudent = asyncHandler(async (req, res) => {
  const student = Student.build({
    ...req.body,
  });
  await student.save();
  res.status(200).json({ student });
});

exports.getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ where: { id: req.params.id } });
  if (!student) {
    return res.status(404).json({ message: "not found" });
  }
  // find all certificates
  const certificates = await Certificate.findAll({
    where: { StudentId: student.id },
  });
  res.status(200).json({
    student: {
      ...student.toJSON(),
      certificates,
    },
  });
});
