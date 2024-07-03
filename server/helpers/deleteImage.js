const createHttpError = require("http-errors");
const fs = require("fs").promises;

const deleteImage = async (imagePath) => {
  console.log(imagePath);
  
  try {
    if (!imagePath) {
      console.log("Dev Msg : no need to delete image");
      return true;
    }
    await fs.access(imagePath);
    await fs.unlink(imagePath);
    console.log("image was deleted", imagePath);
  } catch (error) {
    console.log("image does not exist");
  }
};

module.exports = { deleteImage };
