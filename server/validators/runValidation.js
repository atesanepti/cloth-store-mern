const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { deleteImage } = require("../helpers/deleteImage");

const runValidation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //delete image from server
    if (req.file) {
      await deleteImage(req.file.path);
    }

    const response = {
      success: false,
      error: {
        [errors.array()[0].path]: errors.array()[0].msg,
      },
    };
    console.log(response);
    
    res.status(409).json(response);

  } else {
    next();
  }
};

module.exports = {
  runValidation,
};
