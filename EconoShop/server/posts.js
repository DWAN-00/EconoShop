const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema(
  {
    uploader: String,
    uploadDate: { type: Date, default: Date.now },
    title: String,
    price: Number,
    description: String,
    imgOrgName: [{ type: String }],
    imgDateName: [{ type: String }],
  },
  { collection: "posts" }
);

const posts = mongoose.model("posts", boardSchema);

module.exports = posts;
