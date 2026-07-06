const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = require("../config/multer");
const uploadKitImage = require("../controllers/kitImageController");

router.post("/", (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer Error:", err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (err) {
      console.error("Upload Error:", err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
}, uploadKitImage);

module.exports = router;