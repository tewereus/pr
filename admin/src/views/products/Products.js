import React, { useState } from "react";
import { createProduct } from "./apiClient";

const Products = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [productState, setProductState] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: productState.title,
      description: productState.description,
      price: productState.price,
    };
    const response = await createProduct(data);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => productState.title(event.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => productState.description(event.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(event) => productState.price(event.target.value)}
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default Products;
