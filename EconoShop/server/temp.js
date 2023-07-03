passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
    },
    (input_id, input_pw, done) => {
      member.findOne({ id: input_id }, (error, foundMember) => {
        if (error) {
          return done(error);
        }
        if (!foundMember) {
          console.log("로그인 실패");
          return done(null, false, { message: "존재하지 않는 아이디" });
        }
        bcrypt.compare(input_pw, foundMember.pw, (error, result) => {
          try {
            if (result) {
              console.log("로그인 성공");
              return done(null, foundMember);
            } else {
              console.log("로그인 실패: 비밀번호 불일치");
              return done(null, false, {
                message: "비밀번호가 일치하지 않습니다.",
              });
            }
          } catch (error) {
            return done(error);
          }
        });
      });
    }
  )
);
