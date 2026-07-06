const mongoose = require("mongoose");

const visitorLogSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
    },

    entryTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VisitorLog", visitorLogSchema);