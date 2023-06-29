const express = require("express");
const router = require("express").Router();
const member = require("./member.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let email = req.body.email;
  let semester = req.body.semester;
  const memberPost = new member({
    id: id,
    pw: pw,
    email: email,
    semester: semester,
  });
  memberPost
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        text: "success.",
      });
    })
    .catch((error) => {
      console.error("회원 가입 실패:", error);
      res.status(500).json({
        success: false,
        text: "fail",
      });
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/evnet", (req, res) => {
  res.render("evnet");
});

router.get("/fleaMarket", (req, res) => {
  res.render("fleaMarket");
});

router.get("/goods", (req, res) => {
  res.render("goods");
});

router.get("/groupBuy", (req, res) => {
  res.render("groupBuy");
});

module.exports = router;
