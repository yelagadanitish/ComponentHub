require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

async function createAdmin() {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await Admin.create({

      username: "admin",

      password: hashedPassword,

      role: "admin"

    });

    console.log("Admin created successfully");

    process.exit();

  }

  catch (error) {

    console.log(error);

    process.exit(1);

  }

}

createAdmin();