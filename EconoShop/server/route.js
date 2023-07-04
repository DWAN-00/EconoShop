const express = require("express");
const router = express.Router();
const member = require("./member.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ejs = require("ejs");
const bcrypt = require("bcrypt");

function loginCheck(req, res, next) {
  if (req.member) {
    next();
  } else {
    res.send('로그인 하세요 <a href="/login">로그인</a>');
  }
}

router.use(session({ secret: "TMC", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((member, done) => {
  done(null, member.id);
});

passport.deserializeUser((id, done) => {
  member.findOne({ id: id }, (error, result) => {
    if (error) {
      return done(error);
    }
    done(null, result);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
    },
    (input_id, input_pw, done) => {
      member
        .findOne({ id: input_id })
        .then((foundMember) => {
          if (!foundMember) {
            console.log("로그인 실패");
            return done(null, false, { message: "존재하지 않는 아이디" });
          }
          bcrypt
            .compare(input_pw, foundMember.pw)
            .then((result) => {
              if (result) {
                console.log("로그인 성공");
                return done(null, foundMember);
              } else {
                console.log("로그인 실패: 비밀번호 불일치");
                return done(null, false, {
                  message: "비밀번호가 일치하지 않습니다.",
                });
              }
            })
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    }
  )
);

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let pwr = req.body.pwr;
  let email = req.body.email;
  let semester = req.body.semester;
  const memberPost = new member({
    id: id,
    pw: pw,
    pwr: pwr,
    email: email,
    semester: semester,
  });
  memberPost
    .save()
    .then(() => {
      res.render("login");
    })
    .catch((error) => {
      console.error("회원 가입 실패:", error);
      res.send({
        code: 0,
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/loginFail",
  }),
  (req, res) => {
    res.render("mypage.ejs", { userSession: req.user });
  }
);

router.get("/mypage", loginCheck, (req, res) => {
  res.render("mypage.ejs", { userSession: req.user });
});

router.get("/loginFail", (req, res) => {
  res.send({ code: 0 });
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
