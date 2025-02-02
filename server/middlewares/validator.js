const { body, validationResult } = require("express-validator");

const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

const certificateValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("issueDate").notEmpty().withMessage("issueDate is required"),
  body("StudentId").notEmpty().withMessage("StudentId is required"),
];

// used for admin and student login
const adminLoginValidator = [
  body("email").notEmpty().isEmail().withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
];

const studentValidator = [
  body("email").notEmpty().isEmail().withMessage("email is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("dob").notEmpty().withMessage("dob is required"),
];

module.exports = {
  certificateValidator,
  adminLoginValidator,
  studentValidator,
  validateBody,
};
