import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddManager = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: "",
    description: "",
    basePrice: 0,
    color: "",
    product_type: "",
    image: "",
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
      title: inputState.title,
      description: inputState.description,
      basePrice: inputState.basePrice,
      color: inputState.color,
      product_type: inputState.product_type,
      image: inputState.image,
    };
    // setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input
          type="text"
          value={inputState.title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="border rounded-lg h-10 pl-2 m-4"
        />
        <textarea
          value={inputState.description}
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-lg h-32 p-2 m-4"
        />

        <input
          type="number"
          value={inputState.basePrice}
          name="basePrice"
          onChange={handleChange}
          className="border rounded-lg h-12 pl-2 m-4"
        />
        <input
          type="file"
          value={inputState.image}
          name="image"
          multiple
          onChange={handleChange}
          className="flex flex-col border rounded-lg h-12 p-2 m-4 text-slate-600"
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
