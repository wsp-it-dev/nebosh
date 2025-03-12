const { matchedData } = require("express-validator");
const sequelize = require("../config/db");
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

exports.deleteStudent = asyncHandler(async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // delete all certificates
    const certCount = await Certificate.destroy({
      where: {
        StudentId: req.params.id,
      },
    });
    const studentCount = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    await t.commit();
    res.status(200).json({ message: "deleted", certCount, studentCount });
  } catch (e) {
    await t.rollback();
    res.status(500).json({ message: "something went wrong while deleting" });
  }
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const data = matchedData(req);
  const count = await Student.update(data, {
    where: {
      id: req.params.id,
    },
  });
  res.status(201).json({ message: "student updated", count });
});
