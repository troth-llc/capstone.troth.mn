const User = require("../models/user");
exports.profile = (req, res) => {
  User.findById(req.user.id)
    .select("name username avatar type")
    .then((user) => {
      if (user === null) res.json({ msg: "token expired or user not found" });
      else {
        return res.json({ user });
      }
    })
    .catch((err) => res.json({ msg: "some thing went wrong" }));
};
