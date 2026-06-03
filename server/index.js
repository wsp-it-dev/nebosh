require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares");
const { testDB } = require("./utils/helper");
const path = require("path");
const cron = require("node-cron");
const { resendPendingEmailsJob } = require("./lib/jobs");
const logger = require("./utils/logger");

const app = express();

testDB();
// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://neboshuk-validation-verisecure.org",
      "http://neboshuk-validation-verisecure.org",
    ],
  }),
);

// routes
app.get("/api/ping", (req, res) => {
  res.json({ success: true, message: "Server is working🔥" });
});
app.get("/api/test-email", async (req, res) => {
  try {
    if (!req.query.to) {
      return res.status(400).json({
        success: false,
      });
    }
    const sendEmail = require("./utils/sendEmail");
    const message = {
      to: req.query.to,
      subject: "Test Email",
      text: "This is a test email.",
      html: "<p>This is a test email.</p>",
    };
    const result = await sendEmail(message);
    logger.info("Email sent:", result);
    return res.json({
      success: true,
      message: "Email sent",
      result,
    });
  } catch (e) {
    logger.error("Error sending email:", e);
    return res.status(500).json({
      success: false,
      message: "Error sending email",
      error: String(e),
    });
  }
});
app.use("/api/admin", require("./routes/admin.router"));
app.use("/api/students", require("./routes/student.router"));
app.use("/api/certificates", require("./routes/certificate.router"));
app.use("/api/verifications", require("./routes/verifications.router"));
app.use("/api/email-records", require("./routes/emails.router"));
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `route not found`,
  });
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server started at", process.env.PORT);
});

// run each 5 minutes
cron.schedule("*/5 * * * *", resendPendingEmailsJob);
