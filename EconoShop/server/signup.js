const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs"); // 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views")); // 템플릿 파일이 위치한 폴더 경로 설정
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공 설정

// use res.render to load up an ejs view file
app.use(express.json());

app.get("/", (req, res) => {
  res.render("signup");
});

/*
app.get("/", function (req, res, next) {
  var isOwner = authIsOwner(req, res);
  if (!isOwner) {
    res.render("/login");
  } else {
    res.redirect("/");
  }
});
*/

app.listen(3000);
console.log("Server is listening on port 3000");
