const express = require("express");

const router = express.Router();

const upload =
require("../config/multer");

const {

  uploadImage,

  getImage

}
=
require("../controllers/imageController");


router.post(

  "/",

  upload.single("image"),

  uploadImage

);


router.get(

  "/:componentName",

  getImage

);


module.exports =
router;