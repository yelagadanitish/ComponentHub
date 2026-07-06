const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },

    loginTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminLog", adminLogSchema);