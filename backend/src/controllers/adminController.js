const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const AdminLog = require("../models/AdminLog");


// Login

const loginAdmin = async (req, res) => {

  try {

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {

      return res.status(404).json({
        message: "Admin not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid credentials"
      });

    }

    res.status(200).json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Save Admin Log

const saveAdminLog = async (req, res) => {

  try {

    const { adminName } = req.body;

    const log = await AdminLog.create({
      adminName
    });

    res.status(201).json({
      success: true,
      log
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  loginAdmin,
  saveAdminLog
};