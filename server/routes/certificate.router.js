const express = require("express");
const { adminRequired } = require("../middlewares");
const {
  getAllCertificates,
  newCertificate,
  getCertificate,
} = require("../controllers/certificate.controller");
const {
  certificateValidator,
  validateBody,
} = require("../middlewares/validator");
const router = express.Router();

router
  .route("/")
  .get(adminRequired, getAllCertificates)
  .post(adminRequired, certificateValidator, validateBody, newCertificate);

router.route("/:id").get(getCertificate);

module.exports = router;
