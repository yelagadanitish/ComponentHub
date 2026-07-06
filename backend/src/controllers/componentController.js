const sheets = require("../services/googleSheetService");

const ComponentImage =
require("../models/componentImageModel");


// =======================
// Get Components
// =======================

const getComponents = async (req, res) => {

  try {

    // Get data from Google Sheets

    const response =
      await sheets.spreadsheets.values.get({

        spreadsheetId:
          process.env.SHEET_ID,

        range: "Inventory!A:D",

      });

    const rows =
      response.data.values;

    if (!rows || rows.length === 0) {

      return res.status(404).json({

        message: "No data found"

      });

    }

    // Get images from MongoDB

    const images =
      await ComponentImage.find();

    // Create image lookup object

    const imageMap = {};

    images.forEach((item) => {

      imageMap[item.componentName] =
        item.imageUrl;

    });

    // Merge Sheet data with Image URLs

    const components =
      rows.slice(1).map((row) => ({

        componentName: row[0],

        category: row[1],

        actualStock: Number(row[2]),

        currentStock: Number(row[3]),

        imageUrl:
          imageMap[row[0]] || ""

      }));


    res.status(200).json(

      components

    );

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};


// =======================
// Add Component
// =======================

const addComponent = async (req, res) => {

  try {

    const {

      componentName,

      category,

      actualStock,

      currentStock

    } = req.body;


    // Get existing component names

    const response =
      await sheets.spreadsheets.values.get({

        spreadsheetId:
          process.env.SHEET_ID,

        range: "Inventory!A:A"

      });

    const rows =
      response.data.values || [];


    // Ignore header row

    const existingComponents =
      rows
        .slice(1)
        .map((row) =>
          row[0]
            ?.trim()
            .toLowerCase()
        );


    // Check duplicates

    if (

      existingComponents.includes(

        componentName
          .trim()
          .toLowerCase()

      )

    ) {

      return res.status(400).json({

        message:
          "Component already exists"

      });

    }


    // Add new component to Google Sheets

    await sheets.spreadsheets.values.append({

      spreadsheetId:
        process.env.SHEET_ID,

      range: "Inventory!A:D",

      valueInputOption:
        "USER_ENTERED",

      resource: {

        values: [[

          componentName,

          category,

          actualStock,

          currentStock

        ]]

      }

    });


    res.status(201).json({

      message:
        "Component added successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};


module.exports = {

  getComponents,

  addComponent

};