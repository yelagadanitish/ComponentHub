const sheets = require("../services/googleSheetService");

const getRecentActivity = async (req, res) => {

    try {

        // Transactions Sheet

        const transactionResponse =
            await sheets.spreadsheets.values.get({

                spreadsheetId: process.env.SHEET_ID,

                range: "Transactions!A:F"

            });

        // User Activity Sheet

        const userResponse =
            await sheets.spreadsheets.values.get({

                spreadsheetId: process.env.SHEET_ID,

                range: "UserComponentActivity!A:E"

            });

        const transactionRows =
            transactionResponse.data.values || [];

        const userRows =
            userResponse.data.values || [];

        const activities = [];

        // ==========================
        // Admin Transactions
        // ==========================

        transactionRows.slice(1).forEach((row) => {

            activities.push({

                type: "ADMIN",

                componentName: row[0],

                action: row[1],

                quantity: Number(row[2]),

                purpose: row[3],

                dateTime: row[4],

                person: row[5]

            });

        });

        // ==========================
        // User Component Issue
        // ==========================

        userRows.slice(1).forEach((row) => {

            activities.push({

                type: "USER",

                componentName: row[1],

                action: "Issued",

                quantity: Number(row[2]),

                purpose: "-",

                dateTime: `${row[3]} ${row[4]}`,

                person: row[0]

            });

        });

        // ==========================
        // Latest First
        // ==========================

        activities.sort((a, b) =>

            new Date(b.dateTime) -

            new Date(a.dateTime)

        );

        res.status(200).json(

            activities.slice(0, 15)

        );

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getRecentActivity

};