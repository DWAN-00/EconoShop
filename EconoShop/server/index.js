const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
const router = require("./route");
app.set("view engine", "ejs"); // 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views")); // 템플릿 파일이 위치한 폴더 경로 설정
app.use(express.static(path.join(__dirname, "../src"))); // 정적 파일 제공 설정
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./route.js"));
require("dotenv").config();

const db_id = "admin";
const db_pw = "??";
const uri =
  "mongodb+srv://" +
  db_id +
  ":" +
  db_pw +
  "@econoshop.tyhsydq.mongodb.net/?retryWrites=true&w=majority";

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
