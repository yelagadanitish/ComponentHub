const uploadKitImage = async (req, res) => {
  try {
    console.log("===== CONTROLLER REACHED =====");
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image received",
      });
    }

    return res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = uploadKitImage;