const express = require("express");

const router = express.Router();

const {

  addUserActivity,

  getUserActivity

}
=
require(

  "../controllers/userActivityController"

);


router.post(

  "/",

  addUserActivity

);


router.get(

  "/",

  getUserActivity

);


module.exports = router;