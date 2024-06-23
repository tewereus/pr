import React, { useState } from "react";
import { updateProdType } from "../../features/productType/prodTypeSlice";
import { useDispatch } from "react-redux";

const EditProductType = ({ setIsEdit, selectedProduct }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState(
    selectedProduct
      ? selectedProduct
      : {
          productName: "",
        }
  );

  const handleChange = (e) => {
    setProductState({
      ...productState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: productState._id,
      data: {
        productName: productState.productName,
      },
    };
    dispatch(updateProdType(data));
    // const response = await axios.put(
    //   `http://localhost:3773/api/v1/product/${data.id}`,
    //   data
    // );
    setIsEdit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedProduct ? (
        <>
          <input
            type="text"
            name="productName"
            value={productState.productName}
            onChange={handleChange}
          />
          <button type="submit">Edit Product</button>
          <button type="button" onClick={() => setIsEdit(false)}>
            Cancel
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  );
};

export default EditProductType;
