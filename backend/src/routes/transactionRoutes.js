const express = require("express");

const router = express.Router();

const {

  addTransaction,

  bulkTransaction,

  getTransactions

} = require("../controllers/transactionController");

router.get("/", getTransactions);

router.post("/", addTransaction);

router.post("/bulk", bulkTransaction);

module.exports = router;