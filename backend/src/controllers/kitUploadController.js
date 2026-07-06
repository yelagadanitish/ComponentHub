const cloudinary = require("../config/cloudinary");

const uploadKitImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No image selected"

            });

        }

        res.status(200).json({

            success: true,

            imageUrl: req.file.path

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    uploadKitImage

};