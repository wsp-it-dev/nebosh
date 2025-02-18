const ADMIN_ROLES = {
  admin: "admin",
  user: "user",
};

const validationRequestStatus = {
  pending: "pending",
  completed: "completed",
  rejected: "rejected",
};

const emailSubjects = {
  toStdForReqInfo:
    "NEBOSH has received a request to verify your NEBOSH certificate",
  reqReceivedVisitor: "Your verification request has been received",
  toVisitorApproved:
    "Your request to verify a NEBOSH certificate has been authorised",
  thanksStd: "Thank you for authorising our verification request",
};

module.exports = {
  ADMIN_ROLES,
  validationRequestStatus,
  emailSubjects,
};
