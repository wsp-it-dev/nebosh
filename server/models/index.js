const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { validationRequestStatus } = require("../lib/constants");
const { v4 } = require("uuid");

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // yyyy-mm-dd
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: true,
  }
);

const Certificate = sequelize.define(
  "Certificate",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // yyyy-mm-dd
    issueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ident: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: v4(),
      allowNull: false,
    },
  },
  {
    tableName: "certificates",
    timestamps: true,
  }
);

const CertValidationRequest = sequelize.define(
  "CertValidationRequest",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: validationRequestStatus.pending,
      allowNull: false,
    },
  },
  {
    tableName: "cert_validation_requests",
    timestamps: true,
  }
);

// Associations
// student and certificate
Student.hasMany(Certificate);
Certificate.belongsTo(Student);
// certificate and validation request
Certificate.hasMany(CertValidationRequest, {
  onDelete: "CASCADE",
  hooks: true,
});
CertValidationRequest.belongsTo(Certificate);

module.exports = {
  Student,
  Certificate,
  CertValidationRequest,
};
