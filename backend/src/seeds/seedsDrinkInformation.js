require("dotenv").config();
const slugify = require("slugify");
const mongoose = require("mongoose");
const Drink = require("../models/drinkInformation");

function makeSlug(name) {
  return slugify(name, { lower: true, strict: true });
}

async function seed() {
  try {
    const uri = process.env.MONGODB_CONNECTIONSTRING;
    if (!uri) throw new Error("Thiếu MONGODB_CONNECTIONSTRING trong file .env");

    await mongoose.connect(uri);
    console.log("✅ Connected Mongo Atlas");

    // ✅ Dữ liệu bạn điền ở đây
    const drinks = [
      {
        nameDrink: "Trà đào",
        image: "/img/trà/tradao.jpg",
        money: "25.000",
        status: "Còn",
        review: "Trà đào thơm ngon, mát lạnh, vị đào đậm đà",
      },
      {
        nameDrink: "Trà Trái cây",
        image: "/img/trà/tratraicay.jpg",
        money: "20.000",
        status: "Còn",
        review: "Trà trái cây thơm ngon, mát mẻ, dễ uống",
      },    
   ].map((d) => ({
      ...d,
      slug: makeSlug(d.nameDrink),
    }));

    await Drink.insertMany(drinks);
    console.log("✅ Seed xong");

    process.exit(0);
  } catch (err) {
    console.log("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
