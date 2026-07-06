const Kit = require("../models/kitModel");
const sheets = require("../services/googleSheetService");

const issueKits = async (req, res) => {

    try {

        const { kits, issuedBy } = req.body;

        if (!kits || kits.length === 0) {

            return res.status(400).json({

                success: false,

                message: "No kits selected"

            });

        }

        // =====================================
        // Read Inventory Sheet
        // =====================================

        const inventoryResponse =

            await sheets.spreadsheets.values.get({

                spreadsheetId: process.env.SHEET_ID,

                range: "Inventory!A:D"

            });

        const inventory =

            inventoryResponse.data.values || [];

        // =====================================
        // Read Selected Kits
        // =====================================

        const selectedKits = [];

        for (const item of kits) {

            const kit = await Kit.findById(item.kitId);

            if (!kit) {

                return res.status(404).json({

                    success: false,

                    message: "Kit not found"

                });

            }

            selectedKits.push({

                kit,

                quantity: Number(item.quantity)

            });

        }

        // =====================================
        // Calculate Total Components Required
        // =====================================

        const totalRequired = {};

        for (const selected of selectedKits) {

            for (const component of selected.kit.components) {

                const requiredQty =

                    Number(component.quantity) *

                    Number(selected.quantity);

                if (

                    totalRequired[component.componentName]

                ) {

                    totalRequired[component.componentName] += requiredQty;

                }

                else {

                    totalRequired[component.componentName] = requiredQty;

                }

            }

        }

        // =====================================
        // Validate Inventory
        // =====================================

        for (const componentName in totalRequired) {

            const row = inventory.find(

                item => item[0] === componentName

            );

            if (!row) {

                return res.status(404).json({

                    success: false,

                    message: `${componentName} not found in Inventory`

                });

            }

            const currentStock =

                Number(row[3]);

            const requiredStock =

                totalRequired[componentName];

            if (requiredStock > currentStock) {

                return res.status(400).json({

                    success: false,

                    message:
`${componentName} has only ${currentStock} available. Required ${requiredStock}.`

                });

            }

        }

                // =====================================
        // Deduct Inventory
        // =====================================

        for (const componentName in totalRequired) {

            const rowIndex = inventory.findIndex(

                item => item[0] === componentName

            );

            const row = inventory[rowIndex];

            const actualStock = Number(row[2]);

            const currentStock = Number(row[3]);

            const updatedCurrentStock =

                currentStock -

                totalRequired[componentName];

            await sheets.spreadsheets.values.update({

                spreadsheetId: process.env.SHEET_ID,

                range: `Inventory!C${rowIndex + 1}:D${rowIndex + 1}`,

                valueInputOption: "USER_ENTERED",

                resource: {

                    values: [[

                        actualStock,

                        updatedCurrentStock

                    ]]

                }

            });

        }

        // =====================================
        // Save Transactions
        // =====================================

        const now = new Date();

        const dateTime =

            `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        const kitSummary = selectedKits

            .map(

                item =>

                `${item.kit.kitName} × ${item.quantity}`

            )

            .join(", ");

        for (const componentName in totalRequired) {

            await sheets.spreadsheets.values.append({

                spreadsheetId: process.env.SHEET_ID,

                range: "Transactions!A:F",

                valueInputOption: "USER_ENTERED",

                resource: {

                    values: [[

                        componentName,

                        "Issued",

                        totalRequired[componentName],

                        `Kit Issue (${kitSummary})`,

                        dateTime,

                        issuedBy

                    ]]

                }

            });

        }

        return res.status(200).json({

            success: true,

            message: "Kit(s) Issued Successfully"

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    issueKits

};