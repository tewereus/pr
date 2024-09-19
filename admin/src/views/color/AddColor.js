import React, { useState } from "react";
import { addColor } from "../../store/color/colorSlice";
import { useDispatch } from "react-redux";

const AddColor = ({ setIsAdd }) => {
  const dispatch = useDispatch();
  const [colorState, setColorState] = useState({
    name: "",
    hex_code: "",
  });

  const handleChange = (e) => {
    setColorState({
      ...colorState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: colorState.name,
      hex_code: colorState.hex_code,
    };
    dispatch(addColor(data));
    // setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        color name:
        <input
          type="text"
          value={colorState.name}
          name="name"
          onChange={handleChange}
        />
      </label>
      <label>
        hex code:
        <input
          type="text"
          value={colorState.hex_code}
          name="hex_code"
          onChange={handleChange}
          placeholder="eg. #000"
        />
      </label>
      <input type="color" />
      <button type="submit">Add Color</button>
      <button type="button" onClick={() => setIsAdd(false)}>
        Close Modal
      </button>
    </form>
  );
};

export default AddColor;
