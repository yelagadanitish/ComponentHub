const sheets = require("../services/googleSheetService");

const getDashboard = async (req, res) => {

  try {

    // Inventory Sheet

    const inventoryResponse =
      await sheets.spreadsheets.values.get({

        spreadsheetId: process.env.SHEET_ID,

        range: "Inventory!A:D"

      });

    // Transactions Sheet

    const transactionResponse =
      await sheets.spreadsheets.values.get({

        spreadsheetId: process.env.SHEET_ID,

        range: "Transactions!A:E"

      });

    const inventoryRows =
      inventoryResponse.data.values || [];

    const transactionRows =
      transactionResponse.data.values || [];

    // Remove header rows

    const inventory =
      inventoryRows.slice(1);

    const transactions =
      transactionRows.slice(1);

    // ==========================
    // Total Components
    // ==========================

    const totalComponents =
      inventory.length;

    // ==========================
    // Low Stock
    // ==========================

    const lowStockItems =
      inventory.filter(
        row => Number(row[3]) <= 50
      );

    const lowStock =
      lowStockItems.length;

    // ==========================
    // Most Used Component
    // ==========================

    let usageMap = {};

    transactions.forEach(row => {

      const componentName = row[0];

      const action = row[1];

      const quantity = Number(row[2]);

      if (action === "Issued") {

        usageMap[componentName] =
          (usageMap[componentName] || 0)
          + quantity;

      }

    });

    const topUsedComponents =
  Object.entries(usageMap)

    .sort((a, b) => b[1] - a[1])

    .slice(0, 5)

    .map(([component, count]) => ({

      component,

      count

    }));

    let mostUsedComponent = "No Data";

    let maxUsage = 0;

    for (let component in usageMap) {

      if (usageMap[component] > maxUsage) {

        maxUsage =
          usageMap[component];

        mostUsedComponent =
          component;

      }

    }

    // ==========================
    // Recently Added
    // ==========================

    const recentlyAdded =
      transactions.filter(
        row => row[1] === "Added"
      ).length;

    // ==========================
    // Category Distribution
    // ==========================

    let categoryMap = {};

    inventory.forEach(row => {

      const category = row[1];

      categoryMap[category] =
        (categoryMap[category] || 0)
        + 1;

    });

    const categoryDistribution =
      Object.entries(categoryMap)
      .map(([category, count]) => ({

        name: category,

        value: count

      }));

    // ==========================
    // Response
    // ==========================

    res.status(200).json({

      totalComponents,

      lowStock,

      mostUsedComponent,

      recentlyAdded,

      categoryDistribution,

      topUsedComponents

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {
  getDashboard
};