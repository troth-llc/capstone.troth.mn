const Episode = require("../models/episode");
const Category = require("../models/category");
const User = require("../models/user");
const Course = require("../models/course");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
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
        const token = req.header("x-auth-token");
        jwt.verify(token, process.env.JWTSECRET, (err, data) => {
          if (err) {
            Episode.findOne({ _id: episode, free: true })
              .then((episode_result) => {
                return episode_result
                  ? res.json({ result, episode: episode_result })
                  : res.json({
                      result,
                      episode: { msg: "video unavailable" },
                    });
              })
              .catch((err) => res.json({ status: false }));
          } else {
            User.findById(data.id).then((user) => {
              if (user.type === "premium") {
                Episode.findById(episode)
                  .then((episode_result) =>
                    res.json({ result, episode: episode_result })
                  )
                  .catch((err) => res.json({ status: false }));
              } else {
                Episode.findOne({ _id: episode, free: true })
                  .then((episode_result) => {
                    return episode_result
                      ? res.json({ result, episode: episode_result })
                      : res.json({
                          result,
                          episode: { msg: "video unavailable" },
                        });
                  })
                  .catch((err) => res.json({ status: false }));
              }
            });
          }
        });
      });
  } else return res.json({ status: false });
};
exports.introduction = (req, res) => {
  Course.find()
    .select("name episode")
    .populate({
      path: "episode",
      select: "name cover duration video",
      options: {
        limit: 1,
      },
    })
    .exec((err, result) => {
      if (err) console.log(err);
      res.json({ result });
    });
};
