const express = require("express");
const router = express.Router();
const path = require("path");
const url = require("url");
const board = require("../posts");
const qs = require("querystring");
const mongoose = require("mongoose");
const multer = require("multer");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config({ path: path.join(__dirname, "../db.env") });
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

router.get("/fleaMarket", (req, res) => {
  const queryTitle = req.query.id;

  if (queryTitle) {
    // queryTitle이 존재할 경우, 해당 글을 데이터베이스에서 찾습니다.
    board.findOne({ title: queryTitle }, (err, foundPost) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        res.status(500).send("서버 오류");
      } else {
        if (foundPost) {
          const title = foundPost.title;
          const description = foundPost.description;
          const price = foundPost.price;
          const imgDateName = foundPost.imgDateName;
          const uploader = foundPost.uploader;
          res.render("viewpost", {
            title,
            description,
            price,
            imgDateName: imgDateName,
            userSession: req.user,
            uploader,
          });
        } else {
          res.status(404).send("게시글이 존재하지 않습니다.");
        }
      }
    });
  } else {
    board.find({}, (err, data) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        res.status(500).send("서버 오류");
      } else {
        const title = "Flea Market";
        const posts = data.map((post) => ({
          title: post.title,
          description: post.description,
          price: post.price,
          imgDateName: post.imgDateName,
        }));
        res.render("fleaMarket", {
          title,
          posts,
          userSession: req.user,
        });
      }
    });
  }
});

router.get("/create", (req, res) => {
  const title = "Flea Market - 새 글 작성";
  res.render("create", { title, userSession: req.user });
});

router.post("/create_process", upload.array("img", 3), (req, res) => {
  const { title, price, description } = req.body;
  const imgOrgName = req.files.map((file) => file.originalname);
  const imgDateName = req.files.map((file) => file.filename);

  const newPost = new board({
    title: title,
    price: price,
    description: description,
    uploader: req.user.name,
    imgOrgName: imgOrgName,
    imgDateName: imgDateName,
  });

  newPost
    .save()
    .then((savedPost) => {
      console.log("게시글 저장 완료:", savedPost);
      res.redirect("/fleaMarket");
    })
    .catch((error) => {
      console.error("게시글 저장 오류:", error);
      res.send("게시글 저장에 실패했습니다.");
    });
});

router.get("/update", (req, res) => {
  const queryTitle = req.query.id;

  if (queryTitle) {
    board.findOne({ title: queryTitle }, (err, foundPost) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        res.status(500).send("서버 오류");
      } else {
        if (foundPost) {
          const title = foundPost.title;
          const description = foundPost.description;
          const price = foundPost.price;
          const imgDateName = foundPost.imgDateName;

          res.render("update", {
            title,
            description,
            price,
            imgDateName,
            userSession: req.user,
          });
        } else {
          res.status(404).send("게시글이 존재하지 않습니다.");
        }
      }
    });
  } else {
    res.status(400).send("잘못된 요청입니다. 글 ID를 제대로 전달해주세요.");
  }
});

router.post("/update_process", upload.array("img", 3), (req, res) => {
  const { ObjectId, title, price, description } = req.body;

  board.findByIdAndUpdate(
    ObjectId,
    {
      title,
      price,
      description,
    },
    { new: true },
    (err, updatedPost) => {
      if (err) {
        console.error("게시글 업데이트 오류:", err);
        res.status(500).send("서버 오류");
      } else {
        if (!updatedPost) {
          res.status(404).send("게시글이 존재하지 않습니다.");
        } else {
          res.redirect(`/?id=${encodeURIComponent(title)}`);
        }
      }
    }
  );
});

router.post("/delete_process", (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    const post = qs.parse(body);
    const id = post.id;

    readData((data) => {
      const filteredData = data.filter((post) => post.title !== id);
      writeData(filteredData, () => {
        res.redirect("/fleaMarket");
      });
    });
  });
});

module.exports = router;
