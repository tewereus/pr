import React, { useEffect, useState } from "react";
import {
  createProduct,
  messageClear,
} from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const AddProduct = ({ setIsOpen }) => {
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
    // setIsOpen(false);
  };
  const { isSuccess, createdProduct } = useSelector((state) => state.products);
  useEffect(() => {
    if (createdProduct && isSuccess) {
      setIsOpen(false);
      dispatch(messageClear());
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 2000);
    }
  }, [isSuccess]);
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
      <button type="button" onClick={() => setIsOpen(false)}>
        Close Modal
      </button>
    </form>
  );
};

export default AddProduct;
