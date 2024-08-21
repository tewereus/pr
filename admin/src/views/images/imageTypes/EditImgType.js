import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateImageType } from "../../../features/images/imageTypes/imgTypeSlice";

const EditImgType = ({ setIsEdit, selectedImage }) => {
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState(
    selectedImage
      ? selectedImage
      : {
          image_type: "",
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
        image_type: imageState.image_type,
      },
    };
    dispatch(updateImageType(data));
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
            name="image_type"
            value={imageState.image_type}
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

export default EditImgType;
