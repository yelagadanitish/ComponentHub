const mongoose = require("mongoose");

const componentImageSchema =
  new mongoose.Schema({

    componentName: {

      type: String,

      required: true,
   
      unique: true

    },

    imageUrl: {

      type: String,

      required: true

    }

  });

module.exports =
  mongoose.model(
    "ComponentImage",
    componentImageSchema
  );