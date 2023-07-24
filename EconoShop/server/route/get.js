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

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/event", (req, res) => {
  res.render("event");
});

router.get("/goods", (req, res) => {
  res.render("goods");
});

router.get("/groupBuy", (req, res) => {
  res.render("groupBuy");
});

router.get("/board", (req, res) => {
  res.render("board");
});

module.exports = router;
