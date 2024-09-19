import React, { useState } from "react";
import { updateColor } from "../../store/color/colorSlice";
import { useDispatch } from "react-redux";

const EditColor = ({ setIsEdit, selectedColor }) => {
  const dispatch = useDispatch();
  const [colorState, setColorState] = useState(
    selectedColor
      ? selectedColor
      : {
          name: "",
          hex_code: "",
        }
  );

  const handleChange = (e) => {
    setColorState({
      ...colorState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: colorState._id,
      data: {
        name: colorState.name,
        hex_code: colorState.hex_code,
      },
    };
    console.log(data);
    dispatch(updateColor(data));
    // const response = await axios.put(
    //   `http://localhost:3773/api/v1/product/${data.id}`,
    //   data
    // );
    setIsEdit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedColor ? (
        <>
          <input
            type="text"
            name="name"
            value={colorState.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hex_code"
            value={colorState.hex_code}
            onChange={handleChange}
          />
          <button type="submit">Edit Product</button>
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

export default EditColor;
