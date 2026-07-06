const Kit = require("../models/kitModel");

const sheets = require("../services/googleSheetService");

const {
    calculateAvailableKits
} = require("../utils/kitAvailability");

// ===============================
// Create Kit
// ===============================

const createKit = async (req, res) => {

    try {

        const {

            kitName,

            description,

            imageUrl,

            createdBy,

            components

        } = req.body;

        if (!kitName || !components || components.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Kit name and components are required"

            });

        }

        const existingKit = await Kit.findOne({

            kitName

        });

        if (existingKit) {

            return res.status(400).json({

                success: false,

                message: "Kit already exists"

            });

        }

        const newKit = new Kit({

            kitName,

            description,

            imageUrl,

            createdBy,

            components

        });

        await newKit.save();

        res.status(201).json({

            success: true,

            message: "Kit created successfully",

            kit: newKit

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Get All Kits
// ===============================

const getAllKits = async (req, res) => {

    try {

        const kits = await Kit.find();

        const inventoryResponse =

        await sheets.spreadsheets.values.get({

            spreadsheetId: process.env.SHEET_ID,

            range: "Inventory!A:D"

        });

        const inventory =

        inventoryResponse.data.values || [];

        const result = [];

        for (const kit of kits) {

            const availability =

            calculateAvailableKits(

                kit.components,

                inventory

            );

            result.push({

                _id: kit._id,

                kitName: kit.kitName,

                description: kit.description,

                imageUrl: kit.imageUrl,

                createdBy: kit.createdBy,

                componentCount:

                    kit.components.length,

                availableKits:

                    availability.availableKits,

                limitingComponent:

                    availability.limitingComponent,

                status:

                    availability.status,

                components:

                    kit.components

            });

        }

        res.status(200).json(result);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Get Single Kit
// ===============================

const getKit = async (req, res) => {

    try {

        const kit = await Kit.findById(

            req.params.id

        );

        if (!kit) {

            return res.status(404).json({

                success: false,

                message: "Kit not found"

            });

        }

        res.status(200).json(kit);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Update Kit
// ===============================

const updateKit = async (req, res) => {
  try {
    const {
      kitName,
      description,
      imageUrl,
      components,
    } = req.body;

    if (!kitName || !components || components.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Kit name and components are required",
      });
    }

    const duplicateKit = await Kit.findOne({
      kitName,
      _id: { $ne: req.params.id },
    });

    if (duplicateKit) {
      return res.status(400).json({
        success: false,
        message: "Another kit with this name already exists",
      });
    }

    const updatedKit = await Kit.findByIdAndUpdate(
      req.params.id,
      {
        kitName,
        description,
        imageUrl,
        components,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedKit) {
      return res.status(404).json({
        success: false,
        message: "Kit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kit updated successfully",
      kit: updatedKit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Kit
// ===============================

const deleteKit = async (req, res) => {

    try {

        await Kit.findByIdAndDelete(

            req.params.id

        );

        res.status(200).json({

            success: true,

            message: "Kit deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createKit,

    getAllKits,

    getKit,

    updateKit,

    deleteKit

};