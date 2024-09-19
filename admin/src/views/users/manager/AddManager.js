import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addManager } from "../../../store/users/userSlice";

const AddManager = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      mobile: inputState.mobile,
      email: inputState.email,
    };
    dispatch(addManager(data));
    // setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input
          type="number"
          value={inputState.mobile}
          name="mobile"
          onChange={handleChange}
          placeholder="Mobile"
          className="border rounded-lg h-10 pl-2 m-4"
        />
        <input
          type="email"
          value={inputState.email}
          name="email"
          onChange={handleChange}
          placeholder="E-Mail"
          className="border rounded-lg h-10 pl-2 m-4"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-red-600 text-white text-lg text-center rounded-lg h-12 p-2 m-4 w-64"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white text-lg text-center rounded-lg h-12 p-2 m-4 w-64"
          >
            Add Manager
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddManager;
