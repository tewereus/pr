import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addImage = async (data) => {
  const response = await axios.post(
    `${base_url}/images/create-image`,
    data
    // config
  );
  console.log(response.data);
  return response.data;
};

const updateImage = async (data) => {
  const response = await axios.put(`${base_url}/images/${data.id}`, data.data);
  return response.data;
};

const deleteImage = async (id) => {
  const response = await axios.delete(`${base_url}/images/delete/${id}`);
  return response.data;
};

const getAllImages = async () => {
  const response = await axios.get(`${base_url}/images/all-images`);
  return response.data;
};

const deleteAllImages = async () => {
  const response = await axios.delete(`${base_url}/images/delete-all`);
  return response.data;
};

const imageService = {
  addImage,
  updateImage,
  deleteImage,
  deleteAllImages,
  getAllImages,
};

export default imageService;
