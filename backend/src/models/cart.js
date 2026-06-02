const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    drinkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drinkInformation",
      required: true,
    },

    nameDrink: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    money: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    slug: {
      type: String,
      slug: "nameDrink",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);