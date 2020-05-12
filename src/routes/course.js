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
router.get("/", course.index);
router.get("/:id", course.find);
module.exports = router;
