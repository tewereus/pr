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

const updateProduct = async (data) => {
  const response = await axios.put(`${base_url}/product/${data.id}`, data.data);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}/product/delete/${id}`);
  return response.data;
};

const deleteAllProducts = async () => {
  const response = await axios.delete(`${base_url}/product/delete-all`);
  return response.data;
};

const addProductType = async (data) => {
  const response = await axios.post(
    `${base_url}/product-type/add-product-type`
  );
  return response.data;
};

const getAllProdTypes = async () => {
  const response = await axios.get(
    `${base_url}/product-type/get-product-types`
  );
  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  addProductType,
  getAllProdTypes,
};

export default productService;
