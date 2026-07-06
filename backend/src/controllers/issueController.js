const sheets = require("../services/googleSheetService");

const issueComponents = async (req, res) => {

    try {

        const {

            userName,

            items

        } = req.body;

        if (!userName || !items || items.length === 0) {

            return res.status(400).json({

                message: "Invalid Request"

            });

        }

        // Read Inventory Sheet

        const response = await sheets.spreadsheets.values.get({

            spreadsheetId: process.env.SHEET_ID,

            range: "Inventory!A:D"

        });

        const rows = response.data.values;

        if (!rows || rows.length <= 1) {

            return res.status(404).json({

                message: "Inventory Empty"

            });

        }

        const updatedRows = [...rows];

        const activityRows = [];

        const now = new Date();

        const date = now.toLocaleDateString();

        const time = now.toLocaleTimeString();

        for (const item of items) {

            const rowIndex = updatedRows.findIndex(

                (row, index) =>

                    index !== 0 &&

                    row[0] === item.componentName

            );

            if (rowIndex === -1) {

                return res.status(404).json({

                    message: `${item.componentName} not found`

                });

            }

            let currentStock = Number(updatedRows[rowIndex][3]);

            if (currentStock < item.quantity) {

                return res.status(400).json({

                    message: `Insufficient stock for ${item.componentName}`

                });

            }

            currentStock -= item.quantity;

            updatedRows[rowIndex][3] = currentStock;

            activityRows.push([

                userName,

                item.componentName,

                item.quantity,

                date,

                time

            ]);

        }

        // Update Inventory Sheet

        await sheets.spreadsheets.values.update({

            spreadsheetId: process.env.SHEET_ID,

            range: "Inventory!A:D",

            valueInputOption: "USER_ENTERED",

            resource: {

                values: updatedRows

            }

        });

        // Append User Activity Sheet

        await sheets.spreadsheets.values.append({

            spreadsheetId: process.env.SHEET_ID,

            range: "UserComponentActivity!A:E",

            valueInputOption: "USER_ENTERED",

            resource: {

                values: activityRows

            }

        });

        res.status(200).json({

            message: "Components Issued Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    issueComponents

};