import React from "react";

const EditProduct = ({ setEditModal }) => {
  return (
    <div>
      <input type="text" name="title" />
      <textarea name="description" />
      <input type="number" name="basePrice" />
      <button>Edit Product</button>
    </div>
  );
};

export default EditProduct;
