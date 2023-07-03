const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const member = require("./member.js");

router.use(session({ secret: "TMC", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((member, done) => {
  done(null, member.id);
});

passport.deserializeUser((id, done) => {
  member.findOne({ id: id }, (erroror, result) => {
    done(erroror, result);
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
