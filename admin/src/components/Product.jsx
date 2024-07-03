import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product, handleDelete } = props;
  const { productId, image, name, oldPrice, newPrice, category } = product;

  return (

      <li className="contant">
        <div className="img">
          <img src={image} alt="product" />
        </div>
        <div>{name}</div>
        <div>{oldPrice}$</div>
        <div>{newPrice}$</div>
        <div>{category}</div>
        <div>
          <MdDeleteOutline
            onClick={() => handleDelete(productId)}
            className="icon"
          />
        </div>
      </li>

  );
};

export default Product;
