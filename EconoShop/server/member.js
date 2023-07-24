const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const memberSchema = new mongoose.Schema(
  {
    name: String,
    id: String,
    pw: String,
    pwr: String,
    email: String,
    semester: Number,
  },
  { collection: "member" }
);

memberSchema.pre("save", function (next) {
  const member = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(member.pw, salt, function (err, hash1) {
      if (err) return next(err);
      member.pw = hash1;
      next();
    });
  });
});

memberSchema.pre("save", function (next) {
  const member = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(member.pwr, salt, function (err, hash2) {
      if (err) return next(err);
      member.pwr = hash2;
      next();
    });
  });
});

const member = mongoose.model("member", memberSchema);

module.exports = member;
