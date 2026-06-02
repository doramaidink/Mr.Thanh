const cors = require('cors');
const port = process.env.PORT || 5000;
const http = require('http');
const db = require('./config/db');
const express = require('express');
const route = require('./routes');
const { env } = require('process');
const app = express();
const dotenv = require('dotenv');


dotenv.config();

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(cors({ origin: ["http://localhost:5173", "https://mr-thanh.onrender.com/"] }));


route(app);


db.connectDB().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server đang chạy tại cổng ${port}`);
  });
});


