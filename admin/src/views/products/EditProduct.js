import React, { useState } from "react";
import { updateProduct } from "../../store/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const EditProduct = ({ setEditModal, selectedProduct }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState(
    selectedProduct
      ? selectedProduct
      : {
          title: "",
          description: "",
          basePrice: 0,
        }
  );

  // const productType = useSelector((state) => state.productTypes.productTypes)
  // console.log(productType)
  const handleChange = (e) => {
    setProductState({
      ...productState,
      [e.target.name]: e.target.value,
    });
    console.log(productState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: productState._id,
      data: {
        title: productState.title,
        description: productState.description,
        basePrice: productState.basePrice,
      },
    };
    console.log(productState);
    dispatch(updateProduct(data));
    // const response = await axios.put(
    //   `http://localhost:3773/api/v1/product/${data.id}`,
    //   data
    // );
    setEditModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedProduct ? (
        <>
          <input
            type="text"
            name="title"
            value={productState.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={productState.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="basePrice"
            value={productState.basePrice}
            onChange={handleChange}
          />
          <button type="submit">Edit Product</button>
          <button type="button" onClick={() => setEditModal(false)}>
            Cancel Edit
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  );
};

export default EditProduct;
