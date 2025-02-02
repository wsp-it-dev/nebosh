require("dotenv").config();

const { ADMIN_ROLES } = require("../lib/constants");
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

async function createAdmin(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = Admin.build({
      email,
      password: hashedPassword,
      role: ADMIN_ROLES.admin,
    });
    await admin.save();
    console.log("user created");
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(1);
  }
}

createAdmin("admin@mail.com", "123456");
