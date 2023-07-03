const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

app.set("view engine", "ejs"); // 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views")); // 템플릿 파일이 위치한 폴더 경로 설정
app.use(express.static(path.join(__dirname, "../src"))); // 정적 파일 제공 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./route.js"));
require("dotenv").config({ path: path.join(__dirname, "db.env") });

let db;

const db_id = process.env.DB_ID;
const db_pw = process.env.DB_PW;
const db_url =
  "mongodb+srv://" +
  db_id +
  ":" +
  db_pw +
  "@econoshop.szbsp91.mongodb.net/econoshop?retryWrites=true&w=majority";
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.error("Failed", error);
  });
