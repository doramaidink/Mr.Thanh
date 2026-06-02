const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    qrToken: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      default: "empty",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Table",
    tableSchema
  );