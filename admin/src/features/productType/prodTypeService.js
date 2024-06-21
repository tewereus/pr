import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

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

const prodTypeService = {
  addProductType,
  getAllProdTypes,
};

export default prodTypeService;
