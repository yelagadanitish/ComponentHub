const express = require("express");

const router = express.Router();

const {

    issueKits

} = require("../controllers/issueKitController");

router.post(

"/",

issueKits

);

module.exports = router;