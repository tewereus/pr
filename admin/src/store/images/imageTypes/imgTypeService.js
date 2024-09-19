import { base_url, config } from "../../../api/axiosConfig";
import axios from "axios";

const addImageType = async (data) => {
  const response = await axios.post(
    `${base_url}/image-types/create-image-type`,
    data
    // config
  );
  console.log(response.data);
  return response.data;
};

const updateImageType = async (data) => {
  const response = await axios.put(
    `${base_url}/image-types/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteImageType = async (id) => {
  const response = await axios.delete(`${base_url}/image-types/delete/${id}`);
  return response.data;
};

const getAllImgTypes = async () => {
  const response = await axios.get(`${base_url}/image-types/all-image-types`);
  return response.data;
};

const deleteAllImgTypes = async () => {
  const response = await axios.delete(`${base_url}/image-types/delete-all`);
  return response.data;
};

const imgTypeService = {
  addImageType,
  updateImageType,
  deleteImageType,
  deleteAllImgTypes,
  getAllImgTypes,
};

export default imgTypeService;
