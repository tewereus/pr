import React from "react";
import { deleteColor } from "../../features/color/colorSlice";
import { useDispatch } from "react-redux";

const DeleteColor = ({ setIsDelete, selectedColor }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteColor(selectedColor._id));
    setIsDelete(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete {selectedColor.name} color? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsDelete(false)}>Cancel</button>
    </div>
  );
};

export default DeleteColor;
