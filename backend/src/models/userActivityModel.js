const mongoose = require("mongoose");

const userActivitySchema =
new mongoose.Schema({

  userName: {

    type: String,

    required: true

  },

  date: {

    type: String,

    required: true

  },

  time: {

    type: String,

    required: true

  }

});

module.exports =
mongoose.model(

  "UserActivity",

  userActivitySchema

);