const ComponentImage =
require("../models/componentImageModel");

const cloudinary =
require("cloudinary").v2;

// ==============================
// Upload Image
// ==============================

const uploadImage = async (req, res) => {

  try {

    const componentName =
      req.body.componentName;

    if (!componentName) {

      return res.status(400).json({

        success: false,

        message: "Component name is required"

      });

    }

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "Image is required"

      });

    }

    const imageUrl =
      req.file.path;

    // Check if image already exists

    const existingImage =
      await ComponentImage.findOne({

        componentName

      });

    // Delete old Cloudinary image

    if (

      existingImage &&

      existingImage.imageUrl

    ) {

      try {

        const parts =
          existingImage.imageUrl.split("/");

        const fileName =
          parts[parts.length - 1];

        const publicId =
          "component-images/" +
          fileName.split(".")[0];

        await cloudinary.uploader.destroy(

          publicId

        );

      }

      catch (err) {

        console.log(

          "Old image could not be deleted."

        );

      }

    }

    // Save new image

    const image =
      await ComponentImage.findOneAndUpdate(

        {

          componentName

        },

        {

          componentName,

          imageUrl

        },

        {

          upsert: true,

          new: true

        }

      );

    res.status(200).json({

      success: true,

      message: "Image uploaded successfully",

      image

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==============================
// Get Image
// ==============================

const getImage = async (req, res) => {

  try {

    const image =
      await ComponentImage.findOne({

        componentName:
          req.params.componentName

      });

    if (!image) {

      return res.status(404).json({

        success: false,

        message: "Image not found"

      });

    }

    res.status(200).json({

      success: true,

      image

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

  uploadImage,

  getImage

};