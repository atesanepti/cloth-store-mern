const { check } = require("express-validator");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");


const userValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3, max: 25 })
    .withMessage("name must be between 3 to 25 characters")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must only contain letters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email address")
    .custom(async (email) => {
      const userExist = await User.exists({ email });
      if (userExist) {
        throw new Error("user already exists");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password must be minimum 6 character")
    .isStrongPassword()
    .withMessage("password is so weak"),

  check("cartData")
    .optional()
    .isObject()
    .withMessage("cart data must be a object"),
];

const loginValidation = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email address")
    .trim()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("could not find an account with this email");

      req.user = user;
      return true;
    }),
  check("password")
  .notEmpty()
  .withMessage("password is required")
  .custom(async (userPassword, {req})=>{
    const originalPassword = req.user.password;
    const passwordMatched = await bcryptjs.compare(
      userPassword,
      originalPassword
    );
    if (!passwordMatched) throw new Error("incorrect password");
    return true
  })
];

module.exports = { userValidation, loginValidation };
