import React, { useEffect, useState } from "react";
import { deleteAllProdTypes } from "../../features/productType/prodTypeSlice";
import { useDispatch } from "react-redux";

const DeleteAllProductTypes = ({ setIsDeleteAll }) => {
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
    dispatch(deleteAllProdTypes());
    setIsDeleteAll(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsDeleteAll(false)}>Cancel</button>
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

export default DeleteAllProductTypes;
