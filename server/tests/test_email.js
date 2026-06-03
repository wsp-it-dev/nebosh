require("dotenv").config();
const sendEmail = require("../utils/sendEmail");

async function testSendEmail() {
  const message = {
    to: "bewah26525@alf5.com",
    subject: "Test Email",
    text: "This is a test email.",
    html: "<p>This is a test email.</p>",
  };
  try {
    const result = await sendEmail(message);
    console.log("Email sent:", result);
  } catch (e) {
    console.error("Error sending email:", e);
  }
}

testSendEmail();
