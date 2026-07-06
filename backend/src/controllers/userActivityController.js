const UserActivity =
require("../models/userActivityModel");


// ====================
// Add User Activity
// ====================

const addUserActivity =
async (req, res) => {

  try {

    const {

      userName

    } = req.body;


    const now = new Date();


    const date =
  now.toLocaleDateString(

    "en-GB"

  );

const time =
  now.toLocaleTimeString(

    "en-IN",

    {

      hour: "2-digit",

      minute: "2-digit",

      hour12: true

    }

  );


    const activity =
      await UserActivity.create({

        userName,

        date,

        time

      });


    res.status(201).json(

      activity

    );

  }

  catch (error) {

    res.status(500).json({

      message:

        error.message

    });

  }

};


// ====================
// Get User Activity
// ====================

const getUserActivity =
async (req, res) => {

  try {

    const activity =
      await UserActivity.find()

      .sort({

        _id: -1

      });


    res.status(200).json(

      activity

    );

  }

  catch (error) {

    res.status(500).json({

      message:

        error.message

    });

  }

};


module.exports = {

  addUserActivity,

  getUserActivity

};