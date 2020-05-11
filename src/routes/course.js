const express = require("express");
const router = express.Router();
const course = require("../controllers/course");
// middleware
const token = require("../middleware/token");
const validate = require("../middleware/validator");
/**
 * /api/course:
 *   post:
 *     description:
 *     responses:
 *       200:
 */
//course
module.exports = router;
