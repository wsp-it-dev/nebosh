const { Op } = require("sequelize");
const { EmailRecord } = require("../models/index");
const logger = require("../utils/logger");
const sendEmail = require("../utils/sendEmail");

// find all email records and resend email and update database
exports.resendPendingEmailsJob = async function () {
  try {
    const records = await EmailRecord.findAll({
      where: {
        status: {
          [Op.ne]: "sent",
        },
      },
    });
    for (let record of records) {
      const sentSuccessfully = await sendEmail({
        to: record.email,
        subject: record.subject,
        html: record.html,
      });
      if (sentSuccessfully) {
        record.status = "sent";
        await record.save();
        logger.info(`email resent scheduler SUCCESS to: ${record.email}`);
      } else {
        logger.info(`email resent scheduler FAILED: ${record.email}`);
      }
    }
  } catch (e) {
    logger.error("error while resending email job", e.message);
  }
};
