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
  { collection: "board" }
);

const board = mongoose.model("board", boardSchema);

module.exports = board;
