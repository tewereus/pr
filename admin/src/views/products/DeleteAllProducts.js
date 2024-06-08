import React, { useEffect, useState } from "react";
import { deleteAllProducts } from "../../features/products/productSlice";
import { useDispatch } from "react-redux";

const DeleteAllProducts = ({ setDeleteModal }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [checkDelete, setCheckDelete] = useState(false);
  const handleDelete = () => {
    setCheckDelete(true);
  };

  const handleCheckInput = (e) => {
    if (e.target.value === "Delete Everything") {
      setDisabled(false);
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllProducts());
    setDeleteModal(true);
  };

  return (
    <div>
      <button onClick={handleDelete}>delete</button>
      {checkDelete && (
        <>
          <h2>
            type "<b>Delete Everything</b>" to make sure to delete
          </h2>
          <input type="text" onChange={handleCheckInput} />
          <button disabled={disabled} onClick={handleDeleteAll}>
            Delete Everything
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteAllProducts;
