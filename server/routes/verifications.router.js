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

router.route("/:id").get(getVerificationReq);

/**
 * @POST confirm verification process by student
 * an email with DOB details will be send to visitor
 * authCode will be required
 */
router.post(
  "/confirm-verification/:id",
  confirmVerificationValidator,
  validateBody,
  confirmVerificationRequest
);

module.exports = router;
