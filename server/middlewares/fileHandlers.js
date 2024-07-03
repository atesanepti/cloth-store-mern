const { multerInit } = require("../helpers/multer");

const singleFile = (filedName) => {
  const dest = "./upload/images";
  const files = ["image/png", "image/jpeg", "image/jpg"];
  const upload = multerInit(dest, files);

  return upload.single(filedName);



};

module.exports = {
  singleFile,
};
