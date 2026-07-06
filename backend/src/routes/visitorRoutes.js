const express = require("express");

const router = express.Router();

const {
  saveVisitor
} = require("../controllers/visitorController");

router.post("/", saveVisitor);

module.exports = router;