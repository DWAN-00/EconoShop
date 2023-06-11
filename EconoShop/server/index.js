const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
app.set("view engine", "ejs"); // 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views")); // 템플릿 파일이 위치한 폴더 경로 설정
app.use(express.static(path.join(__dirname, "../src"))); // 정적 파일 제공 설정
app.use(express.json({ extended: false }));

app.use(express.json());
app.get("/", (req, res) => {
  res.render("main");
});

app.use(express.json());
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.use(express.json());
app.get("/login", (req, res) => {
  res.render("login");
});

app.use(express.json());
app.get("/mypage", (req, res) => {
  res.render("mypage");
});

const uri =
  "mongodb+srv://admin:<PASSWORD>.YK@econoshop.tyhsydq.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(3000, () => {
  console.log("Server started on 3000");
});
