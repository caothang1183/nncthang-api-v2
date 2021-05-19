const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single("photo");

const uploadMultipleImage = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  }).array('photo', 10);

module.exports = {
  uploadSingleImage,
  uploadMultipleImage
};
