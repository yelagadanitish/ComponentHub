const express = require("express");

const router = express.Router();

const {

    createKit,

    getAllKits,

    getKit,

    updateKit,

    deleteKit

} = require("../controllers/kitController");

// Create Kit

router.post("/", createKit);

// Get All Kits

router.get("/", getAllKits);

// Get Single Kit

router.get("/:id", getKit);

// Update Kit

router.put("/:id", updateKit);

// Delete Kit

router.delete("/:id", deleteKit);

module.exports = router;