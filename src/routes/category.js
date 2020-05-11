const express = require("express");
const router = express.Router();
const category = require("../controllers/category");
// middleware
const token = require("../middleware/token");
const validate = require("../middleware/validator");
/**
 * /api/category:
 *   post:
 *     description:
 *     responses:
 *       200:
 */
router.get("/", category.index);
module.exports = router;
