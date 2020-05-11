const Episode = require("../models/episode");
const Course = require("../models/course");
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
  const { id } = req.params;
  return res.json({ status: true });
};
