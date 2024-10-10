import { base_url, config } from "../../../api/axiosConfig";
import axios from "axios";

const addRegion = async (data) => {
  const response = await axios.post(`${base_url}/region/add-region`, data);
  return response.data;
};

const getAllRegions = async () => {
  const response = await axios.get(`${base_url}/region/all-regions`);
  return response.data;
};

const updateRegion = async (data) => {
  const response = await axios.put(
    `${base_url}/region/edit-region/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteRegion = async (id) => {
  const response = await axios.delete(`${base_url}/region/delete/${id}`);
  return response.data;
};

const deleteAllRegions = async () => {
  const response = await axios.delete(`${base_url}/region/delete-all`);
  return response.data;
};

const regionService = {
  addRegion,
  getAllRegions,
  updateRegion,
  deleteRegion,
  deleteAllRegions,
};

export default regionService;
