const Episode = require("../models/episode");
const Category = require("../models/category");
const Course = require("../models/course");
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
  Category.find().then((result) => res.json({ result }));
};
