const createHttpError = require("http-errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { successRes } = require("../helpers/response");

const createUser = async (req, res, next) => {
  try {
    const payload = {};

    for (let key in req.body) {
      payload[key] = req.body[key];
    }

    const cartData = {};
    for (let i = 1; i <= 100; i++) {
      cartData[i] = 0;
    }

    payload.cartData = cartData;

    const product = await User.create(payload);

    return successRes(res, {
      statusCode: 201,
      message: "user successfuly created",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const accessToken = jwt.sign(
      {
        user: {
          name: req.user.name,
          email: req.user.email,
        },
      },
      process.env.JWT_ACCESS_TOKEN
    );

    res.cookie("accessToken", accessToken);

    return successRes(res, {
      statusCode: 200,
      message: "login successful",
      payload: {
        token: accessToken,
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const checkRoute = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) throw createHttpError(400, "token was not found");

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    if (!decoded) throw createHttpError(401, "authentication failed!");

    return successRes(res, {
      success: true,
      statusCode: 200,
      message: "token is valid",
    });
  } catch (error) {
    next(error);
  }
};

const addProductInCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    //verify user token
    const token = req.get("accessToken");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    if (!decoded) throw createHttpError(401, "authentication failed");

    // fetch the user
    const user = await User.findOne({ email: decoded.user.email });
    if (!user) throw createHttpError(401, "authentication failed");

    const cartData = user.cartData;
    cartData[productId] += 1;

    //update user cart item
    const updatedUser = await User.findOneAndUpdate(
      {
        email: decoded.user.email,
      },
      { cartData: cartData }
    );

    return successRes(res, {
      statusCode: 201,
      success: true,
      message: "cart was updated",
      payload: updatedUser.cartData,
    });
  } catch (error) {
    next(error);
  }
};

const removeProductInCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    //verify user token
    const token = req.get("accessToken");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    if (!decoded) throw createHttpError(401, "authentication failed");

    // fetch the user
    const user = await User.findOne({ email: decoded.user.email });
    if (!user) throw createHttpError(401, "authentication failed");

    let cartData = user.cartData;
    if (cartData[productId] > 0) {
      cartData[productId] = cartData[productId] - 1;
    }
    console.log(cartData);
    //update user cart item
    const updatedUser = await User.findOneAndUpdate(
      {
        email: decoded.user.email,
      },
      { cartData: cartData }
    );
    
    return successRes(res, {
      statusCode: 201,
      success: true,
      message: "cart was updated",
      payload: updatedUser.cartData,
    });
  } catch (error) {
    next(error);
  }
};

const getCartData = async (req, res, next) => {
  try {
    //verify user token
    const token = req.get("accessToken");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    if (!decoded) throw createHttpError(401, "authentication failed");

    // fetch the user
    const user = await User.findOne({ email: decoded.user.email });
    if (!user) throw createHttpError(401, "authentication failed");

    const cartData = user.cartData;
    console.log(cartData);
    
    return successRes(res, {
      statusCode: 200,
      message: "all cart data fethced",
      payload: cartData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  checkRoute,
  addProductInCart,
  removeProductInCart,
  getCartData,
};
