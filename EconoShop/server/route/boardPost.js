const express = require("express");
const router = express.Router();
const path = require("path");
const url = require("url");
const posts = require("../posts");
const qs = require("querystring");
const mongoose = require("mongoose");
const multer = require("multer");
const { ObjectId } = require("mongoose").Types;
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
    posts.findOne({ title: queryTitle }, (err, foundPost) => {
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
    posts.find({}, (err, data) => {
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

  const newPost = new posts({
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
    posts.findOne({ title: queryTitle }, (err, foundPost) => {
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
  const { id, title, price, description } = req.body;

  posts.findOne({ title: id }, (err, foundPost) => {
    if (err) {
      console.error("게시글 조회 오류:", err);
      console.log(id);
      res.status(500).send("서버 오류");
    } else {
      if (!foundPost) {
        console.error("게시글이 존재하지 않습니다:", id);
        res.status(404).send("게시글이 존재하지 않습니다.");
      } else {
        const postId = foundPost._id;

        const imgOrgName = req.files
          ? req.files.map((file) => file.originalname)
          : [];
        const imgDateName = req.files
          ? req.files.map((file) => file.filename)
          : [];

        posts.findByIdAndUpdate(
          postId,
          {
            title,
            price,
            description,
            imgOrgName,
            imgDateName,
          },
          { new: true },
          (err, updatedPost) => {
            if (err) {
              console.error("게시글 업데이트 오류:", err);
              res.status(500).send("서버 오류");
            } else {
              if (!updatedPost) {
                console.error("게시글이 존재하지 않습니다:", id);
                res.status(404).send("게시글이 존재하지 않습니다.");
              } else {
                res.redirect(`/fleaMarket?id=${encodeURIComponent(title)}`);
              }
            }
          }
        );
      }
    }
  });
});

router.post("/delete_process", (req, res) => {
  const postId = req.body.id;

  posts.findOneAndRemove({ title: postId }, (err, deletedPost) => {
    if (err) {
      console.error("게시글 삭제 오류:", err);
      res.status(500).send("서버 오류");
    } else {
      if (!deletedPost) {
        console.error("게시글이 존재하지 않습니다:", postId);
        res.status(404).send("게시글이 존재하지 않습니다.");
      } else {
        console.log("게시글 삭제 완료:", deletedPost);
        res.redirect("/fleaMarket");
      }
    }
  });
});

module.exports = router;
