const express = require("express");
const {
  newStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student.controller");
const { adminRequired } = require("../middlewares");
const { validateBody, studentValidator } = require("../middlewares/validator");
const router = express.Router();

router
  .route("/")
  .get(adminRequired, getAllStudents)
  .post(adminRequired, studentValidator, validateBody, newStudent);

router
  .route("/:id")
  .get(getStudent)
  .put(adminRequired, studentValidator, validateBody, updateStudent)
  .delete(adminRequired, deleteStudent);

module.exports = router;
