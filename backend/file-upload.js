const multer = require("multer");
//NOTE: so to send the image file to the server we are using multer. With json body we can send only text. But with multer we can send binary files
const uuid = require("uuid/v1");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  //NOTE: so fileUpload is a middlewafre function that multer provides. Everythin that is inside multer({}) is a configuration
  limits: 500000,
  //NOTE:defines the files size
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
      //NOTE: here we define where we store the file
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  //   fileFilter: (req, file, cb) => {
  //     const isValid = !!MIME_TYPE_MAP[file.mimetype];
  //     let error = isValid ? null : new Error("Invalid mime type!");
  //     cb(error, isValid);
  //   },
  //NOTE: here I commented the validation logic
});

module.exports = fileUpload;
