const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
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
router.get("/", token, user.profile);
module.exports = router;
