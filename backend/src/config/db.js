const mongoose = require('mongoose');
async function connectDB()  {
  try {
    await mongoose.connect( process.env.MONGODB_CONNECTIONSTRING );
    console.log("Kết nối dữ liệu thành công");
    }    catch (error) {
        console.log("Kết nối dữ liệu thất bại", error);
        process.exit(1);

    }
}
module.exports = { connectDB };