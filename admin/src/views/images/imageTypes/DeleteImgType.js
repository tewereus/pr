import React from "react";
import { useDispatch } from "react-redux";
import { deleteImageType } from "../../../store/images/imageTypes/imgTypeSlice";

const DeleteImgType = ({ setIsDelete, selectedImage }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteImageType(selectedImage._id));
    setIsDelete(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete {selectedImage.image_type}? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsDelete(false)}>Cancel</button>
    </div>
  );
};

export default DeleteImgType;
