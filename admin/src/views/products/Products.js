import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products } = useSelector((state) => state.products);
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <p>{product.title}</p>
            <p>{product.basePrice}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Products;
