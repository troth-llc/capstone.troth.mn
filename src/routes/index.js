const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("🙆‍♂️🙆‍♂️");
});
router.use("/course", require("./course.js"));
router.use("/episode", require("./episode"));
router.use("/category", require("./category"));
module.exports = router;
