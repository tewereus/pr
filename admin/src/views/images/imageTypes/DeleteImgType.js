import React from "react";
import { useDispatch } from "react-redux";
import { deleteImageType } from "../../../features/images/imageTypes/imgTypeSlice";

const DeleteImgType = ({ setIsDelete, selectedImage }) => {
  const dispatch = useDispatch();

  // const handleCheckInput = (e) => {
  //   if (e.target.value === `Delete ${selectedImage.image_type}`) {
  //     setDisabled(false);
  //   }
  // };

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
