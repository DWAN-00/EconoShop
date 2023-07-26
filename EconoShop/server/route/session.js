const express = require("express");
const router = express.Router();
const path = require("path");
const member = require("../member");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: path.join(__dirname, "../db.env") });
const db_secret = process.env.DB_SECRET;

function loginCheck(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.use(
  session({
    secret: db_secret,
    resave: true,
    saveUninitialized: false,
    //store: MongoStore.create({ mongoUrl: db_url }),
  })
);
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

router.post("/signup", (req, res) => {
  let name = req.body.name;
  let id = req.body.id;
  let pw = req.body.pw;
  let pwr = req.body.pwr;
  let email = req.body.email;
  let semester = req.body.semester;
  const memberPost = new member({
    name: name,
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

router.get("/", (req, res) => {
  res.render("main", { userSession: req.user });
});

router.get("/loginFail", (req, res) => {
  res.redirect("/login");
});

router.get("/mypage", loginCheck, (req, res) => {
  res.render("mypage", { userSession: req.user });
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

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect("/");
    });
  });
});

router.post("/mypage", (req, res) => {
  const userId = req.user.id;
  const currentPw = req.body.currentPw;
  const newPw = req.body.newPw;
  const newPwr = req.body.newPwr;

  bcrypt
    .compare(currentPw, req.user.pw)
    .then((result) => {
      if (!result) {
        console.log("현재 비밀번호가 일치하지 않습니다.");
        res.redirect("/mypage");
        return;
      }

      if (newPw !== newPwr) {
        console.log("비밀번호 확인 실패");
        res.redirect("/mypage");
        return;
      }

      bcrypt.hash(newPw, 10, (err, hashedPw) => {
        if (err) {
          console.error("비밀번호 암호화 실패:", err);
          res.redirect("/mypage");
          return;
        }

        member
          .findOneAndUpdate({ id: userId }, { pw: hashedPw })
          .then(() => {
            console.log("비밀번호 변경 완료");
            res.redirect("/login");
          })
          .catch((error) => {
            console.error("비밀번호 변경 실패:", error);
            res.redirect("/mypage");
          });
      });
    })
    .catch((error) => {
      console.error("비밀번호 확인 중 오류 발생:", error);
      res.redirect("/mypage");
    });
});

module.exports = router;
