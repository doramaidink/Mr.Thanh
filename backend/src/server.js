const cors = require('cors');
const port = 5000;
const db = require('./config/db');
const express = require('express');
const route = require('./routes');
const { env } = require('process');
const app = express();
const dotenv = require('dotenv');


dotenv.config();

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));

app.use(cors({origin: "http://localhost:5173"}));


route(app);


db.connectDB().then(()=>{
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
});


