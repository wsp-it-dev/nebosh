const { v4 } = require("uuid");
const { asyncHandler } = require("../middlewares");
const { Certificate, Student } = require("../models");

exports.getAllCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ certificates });
});

exports.newCertificate = asyncHandler(async (req, res) => {
  // check if already exists
  const cert = await Certificate.findOne({
    where: { number: req.body.number },
  });

  if (cert) {
    return res
      .status(400)
      .json({ message: "certificate number already exists" });
  }

  const certificate = Certificate.build({
    name: req.body.name,
    issueDate: req.body.issueDate,
    number: req.body.number,
    ident: v4(),
  });
  certificate.StudentId = req.body.StudentId;
  await certificate.save();
  res.status(200).json({ certificate });
});

exports.getCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    where: { id: req.params.id },
    include: Student,
  });
  if (!certificate) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ certificate });
});

exports.getCertificateWithNumber = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    where: { number: req.query.number },
    include: Student,
  });
  if (!certificate) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ certificate });
});

exports.getCertificateWithIdent = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    where: { ident: req.params.ident },
    include: Student,
  });
  if (!certificate) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({
    data: {
      name: certificate.Student.name,
      issueDate: certificate.issueDate,
      id: certificate.id,
      ident: certificate.ident,
      number: certificate.number,
    },
  });
});
