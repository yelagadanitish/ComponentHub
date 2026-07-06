const express = require("express");

const router = express.Router();

const {

    issueComponents

} = require("../controllers/issueController");

router.post(

    "/",

    issueComponents

);

module.exports = router;