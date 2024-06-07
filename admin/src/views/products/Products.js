import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products, isLoading } = useSelector((state) => state.products);
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
