import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImgCategory } from "../../../store/images/imageCategories/imgCategorySlice";

const AddImgCategory = ({ setIsAdd }) => {
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState({
    image_category: "",
    image_type: "",
  });

  const { imageTypes } = useSelector((state) => state.imageTypes);

  const handleChange = (e) => {
    setImageState({
      ...imageState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      image_category: imageState.image_category,
      image_type: imageState.image_type,
    };
    dispatch(addImgCategory(data));
    // setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        category:
        <input
          type="text"
          value={imageState.image_category}
          name="image_category"
          onChange={handleChange}
        />
      </label>
      <select name="image_type" onChange={handleChange} required>
        <option value="">Select image type</option>
        {imageTypes.map((image) => (
          <option key={image._id} value={image._id}>
            {image.image_type}
          </option>
        ))}
      </select>
      <button type="submit">Add Image Category</button>
      <button type="button" onClick={() => setIsAdd(false)}>
        Close Modal
      </button>
    </form>
  );
};

export default AddImgCategory;
