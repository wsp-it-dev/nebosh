const moment = require("moment");
const { validationRequestStatus } = require("../lib/constants");
const { asyncHandler } = require("../middlewares");
const { CertValidationRequest, Certificate, Student } = require("../models");
const {
  visitorRequestedEmail,
  studentVerificationEmail,
  confirmedDetailsToVisitor,
  confirmedDetailsToStudent,
} = require("../utils/emailHtmlGenerator");
const { generate4DigitCode, generateRandomString } = require("../utils/helper");
const sendEmail = require("../utils/sendEmail");
const { v4 } = require("uuid");

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
    ident: v4(),
  });

  // generate new code
  request.authCode = generateRandomString(8);
  request.CertificateId = certificate.id;
  await request.save();

  // send email to student
  const studentEmailHtml = studentVerificationEmail(
    request.name,
    request.organization,
    certificate.Student.name,
    certificate.name,
    certificate.number,
    request.authCode,
    `${process.env.FRONTEND_URL_CONFIRM_REQUEST}?ident=${
      request.ident
    }&hash=${generateRandomString(16)}`,
    moment(request.createdAt).add(2, "days").format("DD/MM/YYYY"),
    moment(request.createdAt).format("hh:mm A")
  );
  sendEmail({
    to: certificate.Student.email,
    subject: "NEBOSH has received a request to verify your NEBOSH certificate",
    html: studentEmailHtml,
  });
  // send email to visitor
  sendEmail({
    to: req.body.email,
    subject: "Your verification request has been received",
    html: visitorRequestedEmail(request.name, certificate.number),
  });
  res.status(200).json({ message: "verification request processed" });
});

exports.confirmVerificationRequest = asyncHandler(async (req, res) => {
  // find verification request
  const vr = await CertValidationRequest.findOne({
    where: { id: req.params.id, status: validationRequestStatus.pending },
    include: [
      {
        model: Certificate,
        include: Student,
      },
    ],
  });
  if (!vr) {
    return res.status(404).json({ message: "invalid verification" });
  }
  // check code validity
  if (req.body.authCode !== vr.authCode) {
    return res.status(400).json({ message: "invalid authentication code" });
  }

  // send email to visitor
  visitorEmailHtml = confirmedDetailsToVisitor(
    vr.name,
    vr.Certificate.Student.name,
    vr.Certificate.issueDate,
    vr.Certificate.name,
    vr.Certificate.number,
    vr.Certificate.Student.dob
  );
  sendEmail({
    to: vr.email,
    subject: "Your request to verify a NEBOSH certificate has been authorised",
    html: visitorEmailHtml,
  });
  // send email to student
  learnerEmailHtml = confirmedDetailsToStudent(
    vr.Certificate.Student.name,
    vr.name,
    vr.organization,
    vr.Certificate.number
  );
  sendEmail({
    to: vr.Certificate.Student.email,
    subject: "Thank you for authorising our verification request",
    html: learnerEmailHtml,
  });
  // change status and save to DB
  vr.status = validationRequestStatus.completed;
  await vr.save();
  res.status(200).json({ message: "verification email sent" });
});

exports.getVerificationReq = asyncHandler(async (req, res) => {
  const request = await CertValidationRequest.findOne({
    where: { id: req.params.id },
  });
  if (!request) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ request });
});

exports.getVerificationWithIdent = asyncHandler(async (req, res) => {
  const verification = await CertValidationRequest.findOne({
    where: { ident: req.params.ident },
    include: [
      {
        model: Certificate,
        include: Student,
      },
    ],
  });
  if (!verification) {
    return res.status(404).json({ message: "not found" });
  }

  const resp = {
    certificate: {
      name: verification.Certificate.name,
      number: verification.Certificate.number,
      issueDate: verification.Certificate.issueDate,
    },
    student: {
      name: verification.Certificate.Student.name,
    },
    request: {
      id: verification.id,
      ident: verification.ident,
      name: verification.name,
      organization: verification.organization,
      email: verification.email,
      timestamp: verification.requestTime,
    },
  };

  res.status(200).json({
    data: resp,
  });
});

exports.rejectVerificationReq = asyncHandler(async (req, res) => {
  const verificationRequest = await CertValidationRequest.findOne({
    where: { id: req.params.id, status: validationRequestStatus.pending },
  });
  if (!verificationRequest) {
    return res.status(404).json({ message: "not found" });
  }
  // check code validity
  if (req.body.authCode !== verificationRequest.authCode) {
    return res.status(400).json({ message: "invalid authentication code" });
  }
  verificationRequest.status = validationRequestStatus.rejected;
  await verificationRequest.save();
  res.status(200).json({ message: "status changed" });
});
