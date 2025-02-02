const { body, validationResult } = require("express-validator");

exports.validateBody = (req, res, next) => {
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
  body("number").notEmpty().withMessage("number is required"),
  body("course").notEmpty().withMessage("course is required"),
  body("dob").notEmpty().withMessage("dob is required"),
  body("issueDate").notEmpty().withMessage("issueDate is required"),
];

// used for admin and student login
const adminLoginValidator = [
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
];

module.exports = {
  certificateValidator,
  adminLoginValidator,
};
