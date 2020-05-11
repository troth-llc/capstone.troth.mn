const express = require("express");
const router = express.Router();
const episode = require("../controllers/episode");
// middleware
const token = require("../middleware/token");
const validate = require("../middleware/validator");
/**
 * /api/episode:
 *   post:
 *     description:
 *     responses:
 *       200:
 */
module.exports = router;
