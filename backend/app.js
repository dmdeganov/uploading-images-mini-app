const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const fileUpload = require("./file-upload");
const Image = require("./models/image");
const { response } = require("express");
const fs = require("fs");
app.use(bodyParser.json());

// app.use(express.static("./uploads/images"));
const way = path.join("uploads", "images");
console.log(way);

app.use("/uploads/images", express.static(path.join("uploads", "images")));
//NOTE: by default all the files from server side are not accessible from outside. Here we are allowing to grab the files from this folder

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/", fileUpload.single("image"));

const postImage = async (req, res, next) => {
  const path = req.file.path;
  const name = req.body.name;
  const createdImage = new Image({ name, path });

  try {
    await createdImage.save();
  } catch (err) {
    console.log(err);

    return next(error);
  }
  res.json("Posted successfully");
};

const getImages = async (req, res, next) => {
  let images;
  try {
    images = await Image.find({});
    res.json(images);
  } catch (err) {
    return next(err);
  }
};
app.get("/", getImages);
app.post("/", postImage);
mongoose
  .connect(
    `mongodb+srv://James:bvg30081956@cluster0.lhr9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
