import React, { useEffect, useState } from "react";
import { deleteProduct } from "../../features/products/productSlice";
import { useDispatch } from "react-redux";

const DeleteProduct = ({ setDeleteModal, selectedProduct }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [checkDelete, setCheckDelete] = useState(false);
  const handleDel = () => {
    setCheckDelete(true);
  };

  const handleCheckInput = (e) => {
    if (e.target.value === `Delete ${selectedProduct.title}`) {
      setDisabled(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteProduct(selectedProduct._id));
    setDeleteModal(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDel}>confirm</button>
      <button onClick={() => setDeleteModal(false)}>Cancel</button>
      {checkDelete && (
        <>
          <h2>
            type "<b>Delete {selectedProduct.title}</b>" to make sure to delete
          </h2>
          <input type="text" onChange={handleCheckInput} />
          <button disabled={disabled} onClick={handleDelete}>
            Confirm Delete
          </button>
          <button onClick={() => setDeleteModal(false)}>Cancel Delete</button>
        </>
      )}
    </div>
  );
};

export default DeleteProduct;
