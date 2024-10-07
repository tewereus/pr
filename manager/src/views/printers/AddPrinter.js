import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPrinters } from "../../store/printer/printerSlice";

const AddPrinter = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    mobile: "",
    fullname: "",
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
      fullname: inputState.fullname,
    };
    dispatch(addPrinters(data));
    setIsOpen(false);
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
          type="fullname"
          value={inputState.fullname}
          name="fullname"
          onChange={handleChange}
          placeholder="Full Name"
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
            Add Printer
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPrinter;
