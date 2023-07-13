const express = require("express");
const router = express.Router();
const multer = require("multer");
const app = express();
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

router.post("/board", upload.array("img", 3), (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.files;
});

module.exports = router;
