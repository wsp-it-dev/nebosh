const nodemailer = require("nodemailer");
const logger = require("./logger");

const transporter = nodemailer.createTransport({
  host: "neboshuk-validation-verisecure.org",
  // host: "nequal.co.uk",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NO_REPLY_EMAIL,
    pass: process.env.NO_REPLY_EMAIL_PASSWORD,
  },
});

/**
 *
 * @param {*} message = {to, subject, text, html}
 */
async function sendEmail(message) {
  const options = {
    from: process.env.NO_REPLY_EMAIL, // sender address
    to: message.to, // list of receivers
    subject: message.subject, // Subject line
    text: message.text, // plain text body
    html: message.html, // html body
  };
  try {
    const info = await transporter.sendMail(options);
    logger.info(`Message sent: %s", ${message.to}, ${info.messageId}`);
    return true;
  } catch (e) {
    logger.error(`${message.to} mail sending error: ${e.message}`);
    return false;
  }
}

module.exports = sendEmail;
