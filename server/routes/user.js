const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  checkRoute,
  addProductInCart,
  removeProductInCart,
  getCartData,
} = require("../controllers/user");
const { userValidation, loginValidation } = require("../validators/user");
const { runValidation } = require("../validators/runValidation");

//POST : user/create
router.post("/create", userValidation, runValidation, createUser);

//POST : user/login
router.post("/login", loginValidation, runValidation, login);

//GET : user/protected
router.get("/protected", checkRoute);

router.post("/addCart/:productId", addProductInCart);

router.post("/removeCart/:productId", removeProductInCart);

router.get("/carts", getCartData);




module.exports = router;
