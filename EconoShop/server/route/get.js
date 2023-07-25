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
  res.render("login", {userSession : req.user});
});

router.get("/event", (req, res) => {
  res.render("event", {userSession : req.user});
});

router.get("/goods", (req, res) => {
  console.log(req.user);
  res.render("goods", {userSession : req.user});
});

router.get("/groupBuy", (req, res) => {
  res.render("groupBuy", {userSession : req.user});
});

module.exports = router;
