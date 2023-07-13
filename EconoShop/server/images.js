const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    uploader: String,
    uploadDate: Date,
    fileName: String,
  },
  { collection: "images" }
);

module.exports = images;
