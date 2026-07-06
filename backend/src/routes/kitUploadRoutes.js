const express = require("express");

const router = express.Router();

const upload =
require("../config/multer");

const {

uploadKitImage

}
=
require("../controllers/kitUploadController");

router.post(

"/",

upload.single("image"),

uploadKitImage

);

module.exports = router;