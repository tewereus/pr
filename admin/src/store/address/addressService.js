import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addAddress = async (data) => {
  const response = await axios.post(`${base_url}/address/add-address`, data);
  return response.data;
};

const getAllAddresses = async () => {
  const response = await axios.get(`${base_url}/address/all-addresses`);
  return response.data;
};

const updateAddress = async (data) => {
  const response = await axios.put(
    `${base_url}/address/edit-address/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteAddress = async (id) => {
  const response = await axios.delete(`${base_url}/address/delete/${id}`);
  return response.data;
};

const deleteAllAddresses = async () => {
  const response = await axios.delete(`${base_url}/address/delete-all`);
  return response.data;
};

const addressService = {
  addAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
  deleteAllAddresses,
};

export default addressService;
