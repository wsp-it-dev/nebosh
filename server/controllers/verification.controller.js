const moment = require("moment");
const { validationRequestStatus, emailSubjects } = require("../lib/constants");
const { asyncHandler } = require("../middlewares");
const {
  CertValidationRequest,
  Certificate,
  Student,
  EmailRecord,
} = require("../models");
const {
  visitorRequestedEmail,
  studentVerificationEmail,
  confirmedDetailsToVisitor,
  confirmedDetailsToStudent,
} = require("../utils/emailHtmlGenerator");
const { generateRandomString } = require("../utils/helper");
const sendEmail = require("../utils/sendEmail");
const { v4 } = require("uuid");

exports.getAllVerifications = asyncHandler(async (req, res) => {
  const requests = await CertValidationRequest.findAll({
    include: Certificate,
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

  let emailSuccess = false;

  // render email html
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
  const visitorEmailHtml = visitorRequestedEmail(
    request.name,
    certificate.number
  );

  // create new email records in database
  const studentEmailRecord = await EmailRecord.create({
    email: certificate.Student.email,
    subject: emailSubjects.toStdForReqInfo,
    html: studentEmailHtml,
  });
  const visitorEmailRecord = await EmailRecord.create({
    email: req.body.email,
    subject: emailSubjects.reqReceivedVisitor,
    html: visitorEmailHtml,
  });

  // send email to student
  emailSuccess = await sendEmail({
    to: certificate.Student.email,
    subject: emailSubjects.toStdForReqInfo,
    html: studentEmailHtml,
  });
  if (emailSuccess) {
    studentEmailRecord.status = "sent";
    await studentEmailRecord.save();
  }
  emailSuccess = false;

  // send email to visitor
  emailSuccess = await sendEmail({
    to: req.body.email,
    subject: emailSubjects.reqReceivedVisitor,
    html: visitorEmailHtml,
  });
  if (emailSuccess) {
    visitorEmailRecord.status = "sent";
    await visitorEmailRecord.save();
  }

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
    return res.status(404).json({ message: "Not found or already verified" });
  }
  // check code validity
  if (req.body.authCode !== vr.authCode) {
    return res.status(400).json({ message: "Invalid authentication code" });
  }

  let emailSuccess = false;

  // render email's html
  const visitorEmailHtml = confirmedDetailsToVisitor(
    vr.name,
    vr.Certificate.Student.name,
    vr.Certificate.issueDate,
    vr.Certificate.name,
    vr.Certificate.number,
    vr.Certificate.Student.dob
  );
  const learnerEmailHtml = confirmedDetailsToStudent(
    vr.Certificate.Student.name,
    vr.name,
    vr.organization,
    vr.Certificate.number
  );

  // create email record and send to visitor
  const visitorEmailRecord = await EmailRecord.create({
    email: vr.email,
    subject: emailSubjects.toVisitorApproved,
    html: visitorEmailHtml,
  });
  emailSuccess = await sendEmail({
    to: vr.email,
    subject: emailSubjects.toVisitorApproved,
    html: visitorEmailHtml,
  });
  if (emailSuccess) {
    visitorEmailHtml.status = "sent";
    await visitorEmailRecord.save();
  }
  emailSuccess = false;

  // create email record and send to visitor
  const studentEmailRecord = await EmailRecord.create({
    email: vr.Certificate.Student.email,
    subject: emailSubjects.thanksStd,
    html: learnerEmailHtml,
  });
  emailSuccess = await sendEmail({
    to: vr.Certificate.Student.email,
    subject: emailSubjects.thanksStd,
    html: learnerEmailHtml,
  });
  if (emailSuccess) {
    // change status and save to DB
    studentEmailRecord.status = "sent";
    await studentEmailRecord.save();
  }

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
    return res.status(404).json({ message: "Not found or already verified" });
  }
  // check code validity
  if (req.body.authCode !== verificationRequest.authCode) {
    return res.status(400).json({ message: "Invalid authentication code" });
  }
  verificationRequest.status = validationRequestStatus.rejected;
  await verificationRequest.save();
  res.status(200).json({ message: "status changed" });
});
