import React, { useState } from "react";
import { createProduct } from "../../features/products/productSlice";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState({
    title: "",
    description: "",
    basePrice: 0,
  });

  const handleChange = (e) => {
    setProductState({
      ...productState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: productState.title,
      description: productState.description,
      basePrice: productState.basePrice,
    };
    dispatch(createProduct(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={productState.title}
          name="title"
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          value={productState.description}
          name="description"
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={productState.basePrice}
          name="basePrice"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
