const Episode = require("../models/episode");
const Category = require("../models/category");
const Course = require("../models/course");
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
  Course.find()
    .select("name description episode cover")
    .populate("category", "name")
    .populate({
      path: "episode",
      select: "name cover duration",
      options: {
        limit: 6,
      },
    })
    .exec((err, result) => {
      if (err) console.log(err);
      res.json({ result });
    });
};
exports.find = (req, res) => {
  const { id } = req.params;
  Course.findById(id)
    .select("name description episode cover")
    .populate("category", "name")
    .populate({
      path: "episode",
      select: "name cover duration",
      options: {
        limit: 6,
      },
    })
    .exec((err, result) => {
      if (err) console.log(err);
      res.json({ result });
    });
};
