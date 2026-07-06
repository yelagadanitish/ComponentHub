const VisitorLog = require("../models/VisitorLog");

const saveVisitor = async (req, res) => {
  try {

    const { visitorName } = req.body;

    if (!visitorName) {
      return res.status(400).json({
        message: "Visitor name is required"
      });
    }

    const visitor = await VisitorLog.create({
      visitorName
    });

    res.status(201).json({
      success: true,
      visitor
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  saveVisitor
};