const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema(
  {
    uploader: String,
    uploadDate: Date,
    fileName: String,
  },
  { collection: "posts" }
);

module.exports = posts;
