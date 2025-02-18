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
    // certificate number
    number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // dd/mm/yyyy
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
    // new Date() from frontend JS
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
    ident: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: v4(),
      allowNull: false,
    },
  },
  {
    tableName: "cert_validation_requests",
    timestamps: true,
  }
);

const EmailRecord = sequelize.define(
  "EmailRecord",
  {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "sent", "failed"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    tableName: "email_records",
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
// email record and request
CertValidationRequest.hasMany(EmailRecord);
EmailRecord.belongsTo(CertValidationRequest);

module.exports = {
  Student,
  Certificate,
  CertValidationRequest,
  EmailRecord,
};
