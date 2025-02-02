const nodemailer = require("nodemailer");
const logger = require("./logger");

const transporter = nodemailer.createTransport({
  host: "nequal.co.uk",
  port: 465,
  secure: true,
  auth: {
    user: process.env.REG_EMAIL,
    pass: process.env.REG_EMAIL_PASS,
  },
});

/**
 *
 * @param {*} message = {to, subject, text, html}
 */
async function sendEmail(message) {
  const options = {
    from: process.env.REG_EMAIL, // sender address
    to: message.to, // list of receivers
    subject: message.subject, // Subject line
    text: message.text, // plain text body
    html: message.html, // html body
  };
  try {
    const info = await transporter.sendMail(options);
    logger.info(`Message sent: %s", ${message.to}, ${info.messageId}`);
  } catch (e) {
    logger.error(`err while sending message ${e.message}`);
  }
}

module.exports = sendEmail;
