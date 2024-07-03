const multer = require("multer");
const path = require("path");
const createHttpError = require("http-errors");

const { reduceTo } = require("../utilities/math");

const multerInit = (dest, files) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const name = `${file.fieldname}_${Date.now()}${path.extname(
        file.originalname
      )}`;
      cb(null, name);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        cb(new Error("only image file will be accepted"), false);
      } else if (!files.includes(file.mimetype)) {
        cb(new Error("only jpg and png file will be accepted"), false);
      } else {
        cb(null, true);
      }
    },
  });
  return upload;
};

const checkImgSize = (file, maxSize) => {
  const size = reduceTo(maxSize);

  if (file.size > size) {
    throw createHttpError(400, `file must be less then ${maxSize}`);
  } else {
    console.log("Dev msg", "file size is ok");
  }
};

module.exports = {
  multerInit,
  checkImgSize,
};
