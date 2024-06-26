import React, { useEffect, useState } from "react";
import { deleteProdType } from "../../features/productType/prodTypeSlice";
import { useDispatch } from "react-redux";

const DeleteProductType = ({ setIsDelete, selectedProduct }) => {
  const dispatch = useDispatch();

  // const handleCheckInput = (e) => {
  //   if (e.target.value === `Delete ${selectedProduct.productName}`) {
  //     setDisabled(false);
  //   }
  // };

  const handleDelete = () => {
    dispatch(deleteProdType(selectedProduct._id));
    setIsDelete(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete {selectedProduct.productName}? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsDelete(false)}>Cancel</button>
    </div>
  );
};

export default DeleteProductType;
