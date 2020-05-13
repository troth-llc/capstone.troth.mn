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
  const { id, episode } = req.params;
  console.log(episode);
  if (id && episode) {
    Course.findById(id)
      .select("name episode cover")
      .populate("category", "name")
      .populate({
        path: "episode",
        select: "name cover duration",
      })
      .exec((err, result) => {
        if (err) res.json({ status: false });
        Episode.findById(episode)
          .then((episode_result) => {
            res.json({ result, episode: episode_result });
          })
          .catch((err) => res.json({ status: false }));
      });
  } else return res.json({ status: false });
};
