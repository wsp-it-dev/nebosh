const express = require("express");
const {
  adminLoginValidator,
  validateBody,
} = require("../middlewares/validator");
const { login } = require("../controllers/admin.controller");
const router = express.Router();

router.post("/login", adminLoginValidator, validateBody, login);

module.exports = router;
