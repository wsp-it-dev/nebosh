const express = require("express");
const { adminRequired } = require("../middlewares");
const {
  verificationReqBody,
  validateBody,
  confirmVerificationValidator,
} = require("../middlewares/validator");
const {
  newVerificationRequest,
  getAllVerifications,
  getVerificationReq,
  confirmVerificationRequest,
  getVerificationWithIdent,
  rejectVerificationReq,
} = require("../controllers/verification.controller");
const router = express.Router();

/**
 * @GET return all certificate requests
 * @POST create new certificate request, certificate_id in req.query is required
 */
router
  .route("/")
  .get(adminRequired, getAllVerifications)
  .post(verificationReqBody, validateBody, newVerificationRequest);

/**
 * @GET return verification request all details
 */
router.route("/:id").get(adminRequired, getVerificationReq);

/**
 * @Get get certificate using certificate.ident
 */
router.get("/verification-with-ident/:ident", getVerificationWithIdent);

/**
 * @POST confirm verification process by student
 * an email with DOB details will be send to visitor
 * authCode will be required in body req.body = {authCode}
 */
router.post(
  "/:id/confirm-verification",
  confirmVerificationValidator,
  validateBody,
  confirmVerificationRequest
);

/**
 * @POST reject verification process by student
 * it will change the verification request status to rejected
 * authCode will be required in body req.body = {authCode}
 */
router.post(
  "/:id/reject-verification",
  confirmVerificationValidator,
  validateBody,
  rejectVerificationReq
);

module.exports = router;
