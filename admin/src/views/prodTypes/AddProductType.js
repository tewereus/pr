import React, { useState } from "react";
import {
  addProductType,
  messageClear,
} from "../../store/productType/prodTypeSlice";
import { useDispatch } from "react-redux";

const AddProduct = ({ setIsAdd }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState({
    productName: "",
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
      productName: productState.productName,
    };
    dispatch(addProductType(data));
    // setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input
          type="text"
          value={productState.productName}
          name="productName"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Product</button>
      <button type="button" onClick={() => setIsAdd(false)}>
        Close Modal
      </button>
    </form>
  );
};

export default AddProduct;
