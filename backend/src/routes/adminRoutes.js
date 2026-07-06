const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  saveAdminLog
} = require("../controllers/adminController");

router.post("/login", loginAdmin);

router.post("/log", saveAdminLog);

module.exports = router;