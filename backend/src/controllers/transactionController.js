const sheets = require("../services/googleSheetService");

// =====================
// Add Transaction
// =====================

const addTransaction = async (req, res) => {

  try {

    const {
      componentName,
      action,
      quantity,
      purpose,
      updatedBy
    } = req.body;

    const qty = Number(quantity);

    // Get Inventory Sheet

    const inventoryResponse =
      await sheets.spreadsheets.values.get({

        spreadsheetId: process.env.SHEET_ID,

        range: "Inventory!A:D"

      });

    const rows = inventoryResponse.data.values;

    if (!rows || rows.length === 0) {

      return res.status(404).json({

        message: "Inventory is empty"

      });

    }

    // Find component row

    let rowIndex = -1;

    for (let i = 1; i < rows.length; i++) {

      if (rows[i][0] === componentName) {

        rowIndex = i;

        break;

      }

    }

    if (rowIndex === -1) {

      return res.status(404).json({

        message: "Component not found"

      });

    }

    let actualStock =
      Number(rows[rowIndex][2]);

    let currentStock =
      Number(rows[rowIndex][3]);

    // Added

    if (action === "Added") {

      actualStock += qty;

      currentStock += qty;

    }

    // Issued

    else if (action === "Issued") {

      if (qty > currentStock) {

        return res.status(400).json({

          message: "Insufficient Stock Available"

        });

      }

      currentStock -= qty;

    }

    // Update Inventory Sheet

    await sheets.spreadsheets.values.update({

      spreadsheetId: process.env.SHEET_ID,

      range: `Inventory!C${rowIndex + 1}:D${rowIndex + 1}`,

      valueInputOption: "USER_ENTERED",

      resource: {

        values: [[

          actualStock,

          currentStock

        ]]

      }

    });

    // Add Transaction

    const currentDateTime =
      new Date().toLocaleString();

    await sheets.spreadsheets.values.append({

      spreadsheetId: process.env.SHEET_ID,

      range: "Transactions!A:F",

      valueInputOption: "USER_ENTERED",

      resource: {

        values: [[

          componentName,

          action,

          qty,

          purpose,

          currentDateTime,

          updatedBy

        ]]

      }

    });

    res.status(201).json({

      success: true,

      message: "Transaction completed successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// =====================
// Bulk Transactions
// =====================

const bulkTransaction = async (req, res) => {

  try {

    const {

      transactions,

      purpose,

      updatedBy

    } = req.body;

    if (!transactions || transactions.length === 0) {

      return res.status(400).json({

        message: "No transactions found"

      });

    }

    // Get Inventory

    const inventoryResponse =

      await sheets.spreadsheets.values.get({

        spreadsheetId: process.env.SHEET_ID,

        range: "Inventory!A:D"

      });

    const rows = inventoryResponse.data.values;

    for (const item of transactions) {

      const {

        componentName,

        action,

        quantity

      } = item;

      const qty = Number(quantity);

      let rowIndex = -1;

      for (let i = 1; i < rows.length; i++) {

        if (rows[i][0] === componentName) {

          rowIndex = i;

          break;

        }

      }

      if (rowIndex === -1) continue;

      let actualStock = Number(rows[rowIndex][2]);

      let currentStock = Number(rows[rowIndex][3]);

      if (action === "Added") {

        actualStock += qty;

        currentStock += qty;

      }

      else {

        if (qty > currentStock) {

          return res.status(400).json({

            message: `${componentName} has insufficient stock`

          });

        }

        currentStock -= qty;

      }

      // Update Inventory

      await sheets.spreadsheets.values.update({

        spreadsheetId: process.env.SHEET_ID,

        range: `Inventory!C${rowIndex + 1}:D${rowIndex + 1}`,

        valueInputOption: "USER_ENTERED",

        resource: {

          values: [[

            actualStock,

            currentStock

          ]]

        }

      });

      // Transaction Entry

      const now = new Date();

      const date = now.toLocaleDateString();

      const time = now.toLocaleTimeString();

      await sheets.spreadsheets.values.append({

        spreadsheetId: process.env.SHEET_ID,

        range: "Transactions!A:F",

        valueInputOption: "USER_ENTERED",

        resource: {

          values: [[

            componentName,

            action,

            qty,

            purpose,

            `${date} ${time}`,

            updatedBy

          ]]

        }

      });

    }

    res.status(200).json({

      success: true,

      message: "Bulk Transaction Successful"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// =====================
// Get Transactions
// =====================

const getTransactions = async (req, res) => {

  try {

    const response =
      await sheets.spreadsheets.values.get({

        spreadsheetId: process.env.SHEET_ID,

        range: "Transactions!A:F"

      });

    const rows =
      response.data.values || [];

    const transactions =
rows.slice(1).map(row => ({

  componentName: row[0],

  action: row[1],

  quantity: Number(row[2]),

  purpose: row[3],

  dateTime: row[4],

  updatedBy: row[5]

}));

    res.status(200).json(transactions);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {

  addTransaction,

  bulkTransaction,

  getTransactions

};