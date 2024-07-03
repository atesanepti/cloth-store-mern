import { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import SuccessMessage from "./SuccessMessage";

export const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    productImage: {},
  });
  const [isMessageShow, setMessageShow] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandeler = (e) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const imageChangeHandler = (e) => {
    setProductDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };

  const submitHandler = async () => {
    let product = {};

    const formData = new FormData();
    for (let key in productDetails) {
      formData.append(key, productDetails[key]);
    }

    const response = await fetch(
      "https://cloth-store-backend-4ogl.onrender.com/products/upload",
      {
        method: "POST",
        headers: {
          Accept: "Application/json",
        },
        body: formData,
      }
    );

    const producData = await response.json();

    if (!producData.success) {
      return alert("soming wrong");
    }
    setMessageShow(true);
    product = producData;
    console.log(product);
    setTimeout(() => {
      setMessageShow(false);
    }, 2000);
  };


  return (
    <div className="product-add">
      {isMessageShow && <SuccessMessage />}
      <div className="form">
        <div className="input one">
          <label htmlFor="title">product title</label>
          <input
            onChange={changeHandeler}
            name="name"
            type="text"
            value={productDetails.name}
            placeholder="product title"
            id="title"
          />
        </div>
        <div className="input 2">
          <label htmlFor="price">price</label>
          <input
            onChange={changeHandeler}
            name="oldPrice"
            value={productDetails.oldPrice}
            type="number"
            placeholder="price"
            id="price"
          />
        </div>
        <div className="input 3">
          <label htmlFor="offer-price">offer price</label>
          <input
            onChange={changeHandeler}
            name="newPrice"
            value={productDetails.newPrice}
            type="number"
            placeholder="offer price"
            id="offer-price"
          />
        </div>
        <div className="input four">
          <label htmlFor="category">product category</label>
          <select
            onChange={changeHandeler}
            name="category"
            value={productDetails.category}
            id="category"
          >
            <option value="category">Category</option>
            <option value="kid">kid</option>
            <option value="women">women</option>
            <option value="men">men</option>
          </select>
        </div>
        <div className="input five file">
          <label htmlFor="image">
            <MdOutlineCloudUpload className="icon" />
            <span>product image</span>
          </label>
          {image && (
            <img
              className="preview-product-imag"
              src={URL.createObjectURL(image)}
            />
          )}

          <input
            onChange={(e) => {
              imageHandler(e);
              imageChangeHandler(e);
            }}
            name="productImage"
            type="file"
            id="image"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
          />
        </div>
        <div className="input six ">
          <button className="btn-primary" onClick={submitHandler}>
            add
          </button>
        </div>
      </div>
    </div>
  );
};
