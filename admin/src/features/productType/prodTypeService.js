import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addProductType = async (data) => {
  const response = await axios.post(
    `${base_url}/product-type/add-product-type`,
    data
  );
  return response.data;
};

const updateProdType = async (data) => {
  const response = await axios.put(
    `${base_url}/product-type/${data.id}`,
    data.data
  );
  return response.data;
};

const getAllProdTypes = async () => {
  const response = await axios.get(
    `${base_url}/product-type/get-product-types`
  );
  return response.data;
};

const prodTypeService = {
  addProductType,
  updateProdType,
  getAllProdTypes,
};

export default prodTypeService;
