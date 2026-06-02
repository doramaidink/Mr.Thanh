const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartControllers");

router.post("/add", cartController.addCart);

router.delete("/:id", cartController.deleteCart);

router.patch("/increase/:id", cartController.increase);

router.patch("/decrease/:id", cartController.decrease);

router.get("/", cartController.getCart);

module.exports = router;

module.exports = router;