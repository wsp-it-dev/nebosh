const sequelize = require("../config/db");
const { Certificate, Student, CertValidationRequest } = require("../models");
const Admin = require("../models/admin.model");
const logger = require("./logger");

exports.testDB = async () => {
  try {
    await sequelize.authenticate();
    Admin.sync({ force: false });
    Student.sync({ force: false });
    Certificate.sync({ force: false });
    CertValidationRequest.sync({ force: false });

    console.log("db authenticated");
    logger.info("db authenticated");
  } catch (e) {
    console.log("db connection error", e.message);
    logger.error(`db connection error: ${e.message}`);
  }
};

exports.generate4DigitCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
