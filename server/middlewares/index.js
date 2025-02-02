const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

exports.adminRequired = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer")) {
    res
      .status(401)
      .json({ success: false, message: "unauthorized, token not found" });
    return;
  }
  // get the token
  const token = auth.split(" ")[1];
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "unauthorized, token not found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user
    const user = await Admin.findByPk(decoded.id);
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "authentication failed, maybe token is expired",
    });
  }
};

exports.errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  logger.error(`500 error ${JSON.stringify(err)}`);
  res.json({
    success: false,
  });
};

/**
 * usage: const func = asyncHandler(async (req, res) => {});
 * @param {async function} fn
 * @returns
 */
exports.asyncHandler = (req, res, next) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
