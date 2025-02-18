const { asyncHandler } = require("../middlewares");
const { EmailRecord, CertValidationRequest } = require("../models");
const sendEmail = require("../utils/sendEmail");

exports.getAllEmails = asyncHandler(async (req, res) => {
  const emails = await EmailRecord.findAll({
    attributes: {
      exclude: "html",
    },
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ emails });
});

exports.getEmailRecord = asyncHandler(async (req, res) => {
  const email = await EmailRecord.findOne({
    where: { id: req.params.id },
    order: [["createdAt", "DESC"]],
    include: [CertValidationRequest],
  });
  if (!email) {
    return res.status(404).json({ message: "email record not found" });
  }
  res.status(200).json({ email });
});

exports.retryEmail = asyncHandler(async (req, res) => {
  const emailRecord = await EmailRecord.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!emailRecord) {
    return res.status(404).json({ message: "email record not found" });
  }
  const result = await sendEmail({
    subject: emailRecord.subject,
    to: emailRecord.email,
    text: "",
    html: emailRecord.html,
  });
  if (!result) {
    emailRecord.status = "failed";
    await emailRecord.save();
    return res
      .status(500)
      .json({ message: "failed to send email, try again later" });
  }
  emailRecord.status = "success";
  await emailRecord.save();
  res.status(200).json({ message: "email sent" });
});
