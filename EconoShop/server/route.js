const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  console.log("in register post");
  let id = req.body.id;
  let pw = req.body.pw;
  let email = req.body.email;
  let semester = req.body.semester;

  // 회원가입 데이터 DB 저장 코드 구현할 곳
  db.collection("login").insertOne(
    { id: id, pw: pw, email: email },
    (error, result) => {
      res.status(200).send({
        message:
          "ajax 통신 성공 - id: " +
          id +
          ", pw: " +
          pw +
          ", email: " +
          email +
          ",semester: " +
          semseter,
      });
    }
  );
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
