import React, { useState } from "react";
import {
  createProduct,
  uploadImg,
  uploadProductImages,
} from "../../store/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone"; // For drag-and-drop functionality
import MultiSelect from "../components/MultiSelect";

const AddProduct = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState({
    title: "",
    description: "",
    basePrice: 0,
    color: [],
    product_type: "",
    images: [],
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

  const handleImageUpload = async (acceptedFiles) => {
    const formData = new FormData();

    // Append each image file to FormData
    acceptedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Dispatch uploadImages action to upload images to Cloudinary
    try {
      const response = await dispatch(uploadProductImages(formData)); // Make sure this action is defined
      console.log("Uploaded Images:", response.payload); // Log the response from the upload
      setProductState((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...acceptedFiles], // Update state with uploaded images
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append product details to formData
    formData.append("title", productState.title);
    formData.append("description", productState.description);
    formData.append("basePrice", productState.basePrice);
    formData.append("color", JSON.stringify(productState.color));
    formData.append("product_type", productState.product_type);

    // Append images to formData
    productState.images.forEach((image) => {
      formData.append("images", image);
    });

    console.log("Form Data:", Array.from(formData)); // Log FormData for debugging

    // Dispatch createProduct action with FormData
    await dispatch(createProduct(formData));

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
        <MultiSelect
          options={colorOptions}
          selectedOptions={productState.color}
          onChange={handleColorChange}
        />

        {/* Dropzone for image uploads */}
        <Dropzone
          onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-400 p-12 text-center m-4 rounded-lg"
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>

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
