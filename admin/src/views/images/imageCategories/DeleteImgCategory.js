import React from "react";
import { useDispatch } from "react-redux";
import { deleteImgCategory } from "../../../features/images/imageCategories/imgCategorySlice";

const DeleteImgCategory = ({ setIsDelete, selectedImage }) => {
  const dispatch = useDispatch();

  // const handleCheckInput = (e) => {
  //   if (e.target.value === `Delete ${selectedImage.img_category}`) {
  //     setDisabled(false);
  //   }
  // };

  const handleDelete = () => {
    dispatch(deleteImgCategory(selectedImage._id));
    setIsDelete(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete {selectedImage.img_category}? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsDelete(false)}>Cancel</button>
    </div>
  );
};

export default DeleteImgCategory;
