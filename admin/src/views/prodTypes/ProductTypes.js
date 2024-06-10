import React, { useState } from "react";
import { addProductType } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProductTypes = () => {
  const dispatch = useDispatch();
  const { productType, setProductType } = useState({
    productName: "",
    fabric: "",
  });

  const handleChange = (e) => {
    setProductType({
      ...productType,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      productName: productType.productName,
      fabric: productType.fabric,
    };
    const response = await axios.post(
      `http://localhost:3773/api/v1/product/add-product-type`,
      data
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={productType.productName}
        name="productName"
        onChange={handleChange}
      />
      <input
        type="text"
        value={productType.fabric}
        name="fabric"
        onChange={handleChange}
      />
      <button type="submit">Add Product Type</button>
    </form>
  );
};

export default ProductTypes;
