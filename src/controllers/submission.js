const Submission = require("../models/submission");
const User = require("../models/user");
const Episode = require("../models/episode");
const crypto = require("crypto");
const { bucket } = require("../middleware/upload");
const hash = () => {
  return crypto
    .createHash("sha1")
    .update(Math.random().toString() + new Date().valueOf().toString())
    .digest("hex");
};
exports.create = (req, res) => {
  const { description, episode_id: episode } = req.body;
  const { id } = req.user;
  if (!req.file)
    return res.json({
      errors: [{ msg: "no file uploaded", param: "file" }],
      status: false,
    });
  else {
    const blob = bucket.file(
      "submission/" +
        hash() +
        "." +
        req.file.originalname.split(".").pop().toLowerCase()
    );
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      console.log(err);
    });
    blobStream.on("finish", async () => {
      const file = `http://cdn.troth.mn/${blob.name}`;
      User.findById(id)
        .populate("submissions", "episode")
        .exec((err, user) => {
          var duplicate = user.submissions.filter(
            (sub) => sub.episode.toString() === episode
          );
          if (duplicate.length > 0)
            return res.json({
              errors: [{ msg: "Хариу иртэл түр хүлээнэ үү.", param: "file" }],
              status: false,
            });
          else {
            Submission.create(
              { user: id, description, episode, file },
              (err, submission) => {
                if (err) console.log(err);
                user.submissions.unshift(submission._id);
                user.save(() => {
                  return res.json({ status: true });
                });
              }
            );
          }
        });
    });
    blobStream.end(req.file.buffer);
  }
};
