import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateImageType } from "../../../features/images/imageTypes/imgTypeSlice";
import { updateImgCategory } from "../../../features/images/imageCategories/imgCategorySlice";

const EditImgCategory = ({ setIsEdit, selectedImage }) => {
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState(
    selectedImage
      ? selectedImage
      : {
          image_category: "",
        }
  );

  const handleChange = (e) => {
    setImageState({
      ...imageState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: imageState._id,
      data: {
        image_category: imageState.image_category,
      },
    };
    dispatch(updateImgCategory(data));
    // const response = await axios.put(
    //   `http://localhost:3773/api/v1/product/${data.id}`,
    //   data
    // );
    setIsEdit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedImage ? (
        <>
          <input
            type="text"
            name="image_category"
            value={imageState.image_category}
            onChange={handleChange}
          />
          <button type="submit">Edit Image</button>
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

export default EditImgCategory;
