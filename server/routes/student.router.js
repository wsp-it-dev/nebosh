const express = require("express");
const {
  newStudent,
  getAllStudents,
  getStudent,
} = require("../controllers/student.controller");
const { adminRequired } = require("../middlewares");
const { validateBody, studentValidator } = require("../middlewares/validator");
const router = express.Router();

router
  .route("/")
  .get(adminRequired, getAllStudents)
  .post(adminRequired, studentValidator, validateBody, newStudent);

router.route("/:id").get(getStudent).delete();

module.exports = router;
