const User = require("../models/user");
const Episode = require("../models/episode");
exports.profile = (req, res) => {
  User.findById(req.user.id)
    .select("name username avatar type submissions")
    .populate({
      path: "submissions",
      populate: {
        path: "episode",
        select: "name cover duration",
      },
    })
    .exec((err, user) => {
      if (err || user === null)
        res.json({ msg: "token expired or user not found" });
      else {
        return res.json({ user });
      }
    });
};
