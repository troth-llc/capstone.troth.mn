const express = require("express");
const router = express.Router();
const submission = require("../controllers/submission");
// middleware
const token = require("../middleware/token");
const { multer } = require("../middleware/upload");
/**
 * /api/submission:
 *   post:
 *     description:
 *     responses:
 *       200:
 */
var upload = multer.single("file");
router.post("/create", token, upload, submission.create);
module.exports = router;
