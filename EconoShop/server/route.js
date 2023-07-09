const express = require("express");
const router = express.Router();
const path = require("path");
const member = require("./member.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const db_cluster = process.env.DB_CLUSTER;
const db_id = process.env.DB_ID;
const db_pw = process.env.DB_PW;
const db_address = process.env.DB_ADDRESS;
const db_url = db_cluster + db_id + db_pw + db_address;
require("dotenv").config({ path: path.join(__dirname, "db.env") });

const db_secret = process.env.DB_SECRET;

function loginCheck(req, res, next) {
  if (req.member) {
    next();
  } else {
    res.render("/login");
  }
}

router.use(
  session({
    secret: db_secret,
    resave: false,
    saveUninitialized: true,
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
  res.render("mypage", { userSession: req.user });
});

router.get("/loginFail", (req, res) => {
  res.send({ code: 0 });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.clearCookie("connect.sid");
      res.redirect("/login");
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

router.get("/event", (req, res) => {
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
