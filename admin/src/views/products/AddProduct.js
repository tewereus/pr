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
    color: "",
    product_type: "",
  });

  const {productTypes} = useSelector((state) => state.productTypes)
  const {colors} = useSelector((state) => state.colors)

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
      color: productState.color,
      product_type: productState.product_type
    };
    console.log(data)
    dispatch(createProduct(data));
    // setIsOpen(false);
  };
  // const { isSuccess, createdProduct } = useSelector((state) => state.products);
  // useEffect(() => {
  //   if (createdProduct && isSuccess) {
  //     setIsOpen(false);
  //     dispatch(messageClear());
  //     //   setTimeout(() => {
  //     //     window.location.reload();
  //     //   }, 2000);
  //   }
  // }, [isSuccess]);
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
      <select name="product_type" onChange={handleChange} required>
        <option value="">select product type</option>
        {productTypes.map((prod) => (
          <option key={prod._id} value={prod._id}>{prod.productName}</option>
        ))}
      </select>
      <select name="color" onChange={handleChange} required>
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color._id} value={color._id}>{color.name}</option>
        ))}
      </select>
      <button type="submit">Add Product</button>
      <button type="button" onClick={() => setIsOpen(false)}>
        Close Modal
      </button>
    </form>
  );
};

export default AddProduct;
