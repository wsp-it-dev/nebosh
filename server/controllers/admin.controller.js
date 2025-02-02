const { asyncHandler } = require("../middlewares");
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const { pick } = require("lodash");
const jwt = require("jsonwebtoken");

exports.login = asyncHandler(async (req, res) => {
  const user = await Admin.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "incorrect email or password" });
  }
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (!matchPassword) {
    return res
      .status(404)
      .json({ success: false, message: "incorrect email or password" });
  }
  // jwt expiry format
  // "10m", "1h", "7d"
  jwt.sign(
    pick(user.toJSON(), ["id", "email"]),
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    },
    (err, token) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      // send normal response
      res.json({
        success: true,
        user: pick(user.toJSON(), ["id", "email", "role"]),
        token,
      });
    }
  );
});
