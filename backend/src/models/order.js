const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      orderCode: Number,

      tableNumber: Number,

      items: [
        {
          drinkId: String,
          nameDrink: String,
          image: String,
          money: String,
          quantity: Number,
        },
      ],

      totalAmount: Number,

      paymentStatus: {
        type: String,
        default: "pending",
      },

      orderStatus: {
        type: String,
        default: "waiting",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );