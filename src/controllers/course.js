const Episode = require("../models/episode");
const Category = require("../models/category");
const Course = require("../models/course");
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
  Course.find()
    .select("name description episode")
    .populate("category", "name")
    .populate({
      path: "episode",
      select: "name cover",
      options: {
        limit: 6,
      },
    })
    .exec((err, result) => {
      if (err) console.log(err);
      res.json({ result });
    });
};
