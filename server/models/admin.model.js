const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { ADMIN_ROLES } = require("../lib/constants");

const Admin = sequelize.define(
  "Admin",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: ADMIN_ROLES.user,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "admins",
    timestamps: true,
  }
);

module.exports = Admin;
