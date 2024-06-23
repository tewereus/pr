import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addProductType = async (data) => {
  const response = await axios.post(
    `${base_url}/product-type/add-product-type`,
    data
    // config
  );
  console.log(response.data);
  return response.data;
};

const updateProdType = async (data) => {
  const response = await axios.put(
    `${base_url}/product-type/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteProdType = async (id) => {
  const response = await axios.delete(`${base_url}/product-type/${id}`);
  return response.data;
};

const getAllProdTypes = async () => {
  const response = await axios.get(
    `${base_url}/product-type/get-product-types`
  );
  return response.data;
};

const deleteAllProdTypes = async () => {
  const response = await axios.delete(
    `${base_url}/product-type/delete-product-types`
  );
  return response.data;
};

const prodTypeService = {
  addProductType,
  updateProdType,
  deleteProdType,
  deleteAllProdTypes,
  getAllProdTypes,
};

export default prodTypeService;
