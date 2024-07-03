const express = require("express");
const router = express.Router();

const {
  uploadProduct,
  findProducts,
  deleteProduct,
  seedProducts,
} = require("../controllers/product");
const {
  productValidate,
  deleteProductvalidate,
} = require("../validators/product");
const { runValidation } = require("../validators/runValidation");
const { singleFile } = require("../middlewares/fileHandlers");

// POST => products/upload
router.post(
  "/upload",
  singleFile("productImage"),
  productValidate,
  runValidation,
  uploadProduct
);

router.get("/",findProducts)

// DELETE => products/
router.delete(
  "/:productId",
  deleteProductvalidate,
  runValidation,
  deleteProduct
);



module.exports = router;
