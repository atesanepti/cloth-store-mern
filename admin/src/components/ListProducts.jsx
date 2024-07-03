import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import Product from "./Product";
import Message from "./Message";

const ListProducts = () => {
  const { data, isLoading, isError } = useFetch(
    "https://core-ecommerce.onrender.com/products"
  );
  const [products, setProducts] = useState(data);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const handleProducts = (productId) => {
    const newProducts = products.filter((product) => {
      return product.productId == productId;
    });
    setProducts(newProducts);
  };

  const handleDelete = async (productId) => {
    const yes = confirm("Are you sure to delete this product?");
    if (!yes) return;
    try {
      const response = await fetch(
        `https://core-ecommerce.onrender.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!data.success) {
        console.log(data.message);
      } else {
        // handleProducts(data.payload.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Status = () => {
    if (isLoading) {
      return <Message message="Loading.." />;
    } else if (products.length <= 0) {
      return <Message message="No products found" />;
    } else {
      return null;
    }
  };

  return (
    <div className="products-list-container">
      <h2 className="product-list-title">All product list</h2>
      <Status />
      <div className="product-list-scroller">
        <ul className="product-list">
          <li className="title">
            <div>product</div>
            <div>name</div>
            <div>old price</div>
            <div>new price</div>
            <div>category</div>
            <div>delete</div>
          </li>
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListProducts;
