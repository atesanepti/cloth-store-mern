const { mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, "product id is required"],
  },
  name: {
    type: String,
    required: [true, "product name is required"],
    minlength: [10, "product name must be minimum in 10 letters"],
    trim: true,
  },
  oldPrice: {
    type: Number,
    required: [true, "product old price is required"],
  },
  newPrice: {
    type: Number,
    required: [true, "product new price is required"],
  },
  category: {
    type: String,
    required: [true, "product category is required"],
  },
  image: {
    type: String,
    required: [true, "product image is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

const Product = new mongoose.model("product", productSchema);

module.exports = Product;
