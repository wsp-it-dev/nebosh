const { asyncHandler } = require("../middlewares");
const { Certificate } = require("../models");

exports.getAllCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ certificates });
});

exports.newCertificate = asyncHandler(async (req, res) => {
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
  });
  if (!certificate) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ certificate });
});

exports.getCertificateWithNumber = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    where: { number: req.query.number },
  });
  if (!certificate) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ certificate });
});

exports.getCertificateWithIdent = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    where: { ident: req.params.ident },
  });
  if (!certificate) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ certificate });
});
