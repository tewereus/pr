import React, { useEffect, useState } from "react";
import { deleteProdType } from "../../features/productType/prodTypeSlice";
import { useDispatch } from "react-redux";

const DeleteProductType = ({ setIsDelete, selectedProduct }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [checkDelete, setCheckDelete] = useState(false);
  const handleDel = () => {
    setCheckDelete(true);
  };

  const handleCheckInput = (e) => {
    if (e.target.value === `Delete ${selectedProduct.productName}`) {
      setDisabled(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteProdType(selectedProduct._id));
    setIsDelete(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDel}>confirm</button>
      <button onClick={() => setIsDelete(false)}>Cancel</button>
      {checkDelete && (
        <>
          <h2>
            type "<b>Delete {selectedProduct.productName}</b>" to make sure to
            delete
          </h2>
          <input type="text" onChange={handleCheckInput} />
          <button disabled={disabled} onClick={handleDelete}>
            Confirm Delete
          </button>
          <button onClick={() => setIsDelete(false)}>Cancel Delete</button>
        </>
      )}
    </div>
  );
};

export default DeleteProductType;
