const express = require("express");
const router = express.Router();
const path = require("path");
const member = require("../member");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: path.join(__dirname, "../db.env") });
const db_secret = process.env.DB_SECRET;

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
