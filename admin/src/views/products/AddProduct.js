/*
todo Use fieldset for price since place holder doesn't work
todo make image accept drag and drop and also make display zone and make it look like that in eshop
*/
import React, { useEffect, useState } from "react";
import {
  createProduct,
  messageClear,
} from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "../components/MultiSelect";

const AddProduct = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState({
    title: "",
    description: "",
    basePrice: 0,
    color: "",
    product_type: "",
    image: "",
  });

  const { productTypes } = useSelector((state) => state.productTypes);
  const { colors } = useSelector((state) => state.colors);

  const handleChange = (e) => {
    setProductState({
      ...productState,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (selectedColors) => {
    setProductState({
      ...productState,
      color: selectedColors,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: productState.title,
      description: productState.description,
      basePrice: productState.basePrice,
      color: productState.color,
      product_type: productState.product_type,
      image: productState.image,
    };
    console.log(data);
    dispatch(createProduct(data));
    setIsOpen(false); // Close the modal after submission
  };

  const colorOptions = colors.map((color) => ({
    value: color._id,
    label: color.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input
          type="text"
          value={productState.title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="border rounded-lg h-10 pl-2 m-4"
        />
        <textarea
          value={productState.description}
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-lg h-32 p-2 m-4"
        />

        <input
          type="number"
          value={productState.basePrice}
          name="basePrice"
          onChange={handleChange}
          className="border rounded-lg h-12 pl-2 m-4"
        />
        <select
          name="product_type"
          onChange={handleChange}
          className="flex flex-col border rounded-lg h-12 p-2 m-4 text-slate-600"
          required
        >
          <option value="">select product type</option>
          {productTypes.map((prod) => (
            <option key={prod._id} value={prod._id}>
              {prod.productName}
            </option>
          ))}
        </select>
        {/* <select
          name="color"
          multiple
          onChange={handleChange}
          className="flex flex-col border rounded-lg h-12 p-2 m-4 text-slate-600"
          required
          style={{
            height: "auto",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {/* <option value="">Select Color</option> 
          <option value="all">All</option>
          {colors.map((color) => (
            <option key={color._id} value={color._id}>
              {color.name}
            </option>
          ))}
        </select> */}
        <MultiSelect
          options={colorOptions}
          selectedOptions={productState.color}
          onChange={handleColorChange}
        />
        <input
          type="file"
          value={productState.image}
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
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
