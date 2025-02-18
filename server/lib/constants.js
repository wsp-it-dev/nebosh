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
};

module.exports = {
  ADMIN_ROLES,
  validationRequestStatus,
  emailSubjects,
};
