const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

const productValidate = [
  check("name")
    .notEmpty()
    .withMessage("product name is required")
    .isLength({ min: 10, max: 60 })
    .withMessage("product name should be within 10 - 60 characters")
    .trim(),

  check("oldPrice")
    .notEmpty()
    .withMessage("old price is required")
    .isInt()
    .withMessage("old price is should be typa a number"),

  check("newPrice")
    .notEmpty()
    .withMessage("new price is required")
    .isInt()
    .withMessage("new price is should be typa a number"),
  check("category")
    .notEmpty()
    .withMessage("product category is required")
    .trim(),
  check("product_image").custom((image, { req }) => {
    if (!req.file) {
      throw new Error("product image is reqiured");
    }
    return true;
  }),
];

const deleteProductvalidate = [
  check("productId")
    .notEmpty()
    .withMessage("product id is required to delete product")
    .isInt()
    .withMessage("product id should be type a number"),
];

// const runValidation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     next(createHttpError(409, errors.array()[0].msg));
//   } else {
//     next();
//   }
// };

module.exports = {
  productValidate,
  deleteProductvalidate,

};
