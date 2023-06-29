const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    id: String,
    pw: String,
    email: String,
    semester: Number,
  },
  { collection: "member" }
);

const member = mongoose.model("member", memberSchema);

module.exports = member;
