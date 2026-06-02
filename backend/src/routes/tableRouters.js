const express =
  require("express");

const router =
  express.Router();

const tableController =
  require(
    "../controllers/tableController"
  );

router.get(
  "/seed",
  tableController.createTables
);

module.exports = router;