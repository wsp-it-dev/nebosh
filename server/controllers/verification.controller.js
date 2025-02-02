const { validationRequestStatus } = require("../lib/constants");
const { asyncHandler } = require("../middlewares");
const { CertValidationRequest, Certificate, Student } = require("../models");
const { generate4DigitCode } = require("../utils/helper");
const sendEmail = require("../utils/sendEmail");

exports.getAllVerifications = asyncHandler(async (req, res) => {
  const requests = await CertValidationRequest.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ requests });
});

exports.newVerificationRequest = asyncHandler(async (req, res) => {
  // validation
  const certificateID = req.query.certificate_id;
  if (!certificateID) {
    return res
      .status(400)
      .json({ message: "certificate_id in request query is missing" });
  }
  // find certificate and student information
  const certificate = await Certificate.findByPk(certificateID, {
    include: Student,
  });

  if (!certificate) {
    return res.status(404).json({ message: "certificate not found" });
  }

  // create new record in DB
  const request = CertValidationRequest.build({
    ...req.body,
  });

  // generate new code
  request.authCode = generate4DigitCode();
  await request.save();

  // send email to student
  // sendEmail({ to: certificate.Student.email });
  // send email to visitor
  // sendEmail({ to: req.body.email });
  res.status(200).json({ message: "verification request processed" });
});

exports.confirmVerificationRequest = asyncHandler(async (req, res) => {
  // find verification request
  const verificationRequest = await CertValidationRequest.findOne(
    {
      where: { id: req.params.id, status: validationRequestStatus.pending },
    },
    {
      include: Certificate,
    }
  );
  if (!verificationRequest) {
    return res.status(404).json({ message: "invalid verification" });
  }
  // check code validity
  if (req.body.authCode !== verificationRequest.authCode) {
    return res.status(404).json({ message: "invalid authentication code" });
  }
  // send email to visitor
  // sendEmail({ to: verificationRequest.email });
  // change status and save to DB
  verificationRequest.status = validationRequestStatus.completed;
  await verificationRequest.save();
  res.status(200).json({ message: "verification email sent" });
});

exports.getVerificationReq = asyncHandler(async (req, res) => {
  const request = await CertValidationRequest.findOne({
    where: { id: req.params.id },
  });
  if (!request) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ requests });
});
