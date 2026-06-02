const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post(
  "/thanhtoanqr",
  paymentController.createQR
);

module.exports = router;