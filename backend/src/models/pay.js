const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paySchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "BANKING"],
      default: "COD",
    },

    totalMoney: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending", // chờ xác nhận
        "confirmed", // đã xác nhận
        "shipping", // đang giao
        "completed", // hoàn thành
        "cancelled", // hủy
      ],
      default: "pending",
    },

    items: [
      {
        drinkId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "drinkInformation",
        },

        nameDrink: String,

        image: String,

        money: Number,

        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pay", paySchema);