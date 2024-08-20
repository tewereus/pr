import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addImgCategory = async (data) => {
  const response = await axios.post(
    `${base_url}/image-category/create-image-category`,
    data
    // config
  );
  console.log(response.data);
  return response.data;
};

const updateImgCategory = async (data) => {
  const response = await axios.put(
    `${base_url}/image-category/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteImgCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}/image-category/delete/${id}`
  );
  return response.data;
};

const allImgCategories = async () => {
  const response = await axios.get(
    `${base_url}/image-category/all-image-category`
  );
  return response.data;
};

const deleteImgCategories = async () => {
  const response = await axios.delete(`${base_url}/image-category/delete-all`);
  return response.data;
};

const imgCategoryService = {
  addImgCategory,
  updateImgCategory,
  deleteImgCategory,
  deleteImgCategories,
  allImgCategories,
};

export default imgCategoryService;
