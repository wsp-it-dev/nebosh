const express = require("express");
const { adminRequired } = require("../middlewares");
const {
  getAllCertificates,
  newCertificate,
  getCertificate,
  getCertificateWithNumber,
  getCertificateWithIdent,
  deleteCert,
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

/**
 * @Get get certificate using certificate.number,
 * request.query = {number}
 */
router.get("/certificate-with-number", getCertificateWithNumber);

/**
 * @Get get certificate using certificate.ident
 */
router.get("/certificate-with-ident/:ident", getCertificateWithIdent);

router.route("/:id").get(getCertificate).delete(adminRequired, deleteCert);

module.exports = router;
