const express = require("express");

const router = express.Router();

const {

  getComponents,

  addComponent

} = require("../controllers/componentController");


// ======================
// Get Components
// ======================

router.get(

  "/",

  getComponents

);


// ======================
// Add Component
// ======================

router.post(

  "/",

  addComponent

);


module.exports = router;