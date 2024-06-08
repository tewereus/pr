import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const createProduct = async (data) => {
  const response = await axios.post(
    `${base_url}/product/create-product`,
    data
    // config
  );
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(
    `${base_url}/product/all-products`
    // null,
    // config
  );
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}/product/${id}`);
  return response.data;
};

const updateProduct = async (id) => {
  const response = await axios.put(`${base_url}/product/${id}`);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}/product/${id}`);
  return response.data;
};

const deleteAllProducts = async () => {
  console.log("i am here");
  const response = await axios.delete(`${base_url}/product/delete-all`);
  console.log("i am here again");
  console.log(response.data);
  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};

export default productService;
