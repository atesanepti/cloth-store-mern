const path = require("path")
const { checkImgSize } = require("../helpers/multer");
const { successRes } = require("../helpers/response");

const Product = require("../models/product");
const {deleteImage} = require("../helpers/deleteImage")

const uploadProduct = async (req, res, next) => {
  try {
    //check image size
    checkImgSize(req.file, "1mb");

    //make a unique product id
    const allProduct = await Product.find({});
    let productId = 1;
    if(allProduct.length > 0){
      productId = allProduct.length + 1;
    }
    console.log("path of the file",req.file.path);
    
    //stor in database
    const payload = {
      productId,
      name: req.body.name,
      oldPrice: +req.body.oldPrice,
      newPrice: +req.body.newPrice,
      category: req.body.category,
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/images/${req.file.filename}`,
    };
    console.log(payload);
    
    const product = await Product.create(payload);


    //success response
    return successRes(res, {
      statusCode: 201,
      message: "product uploaded succussfuly",
      payload: product,
    });
  } catch (error) {
    //delete image from file server
    await deleteImage(req.file.path);
    

    next(error);
  }
};

const deleteProduct = async (req,res,next)=>{
  try {
    const {productId} = req.params;

    //delete product from data base
    const deletedProduct = await Product.findOneAndDelete({
      productId: productId,
    }).lean();

    //success response
    return successRes(res,{
      statusCode : 200,
      message : "product was successfuly deleted",
      payload : deletedProduct
    })


  } catch (error) {
    next(error)
  }
}

const findProducts = async(req,res,next)=>{
  try {
    const products = await Product.find({});
    
    return successRes(res, {
      statusCode: 200,
      message: "product was returned successfuly",
      payload: products,
    });

  } catch (error) {
    next(error)
  }
}





module.exports = {
  uploadProduct,
  deleteProduct,
  findProducts,
};
