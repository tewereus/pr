import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addImageType } from "../../../features/images/imageTypes/imgTypeSlice";

const AddImgType = ({ setIsAdd }) => {
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState({
    image_type: "",
  });

  const handleChange = (e) => {
    setImageState({
      ...imageState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      image_type: imageState.image_type,
    };
    dispatch(addImageType(data));
    // setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input
          type="text"
          value={imageState.image_type}
          name="image_type"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Image Type</button>
      <button type="button" onClick={() => setIsAdd(false)}>
        Close Modal
      </button>
    </form>
  );
};

export default AddImgType;
