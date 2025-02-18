const { Router } = require("express");
const { adminRequired } = require("../middlewares");
const {
  getAllEmails,
  retryEmail,
  getEmailRecord,
} = require("../controllers/emails.controller");
const router = Router();

router.use(adminRequired);

router.get("/", getAllEmails);
router.get("/:id", getEmailRecord);
router.get("/:id/retry", retryEmail);

module.exports = router;
