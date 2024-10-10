import { base_url, config } from "../../../api/axiosConfig";
import axios from "axios";

const addCountry = async (data) => {
  const response = await axios.post(`${base_url}/country/add-country`, data);
  return response.data;
};

const getAllCountries = async () => {
  const response = await axios.get(`${base_url}/country/all-countries`);
  return response.data;
};

const updateCountry = async (data) => {
  const response = await axios.put(
    `${base_url}/country/edit-country/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteCountry = async (id) => {
  const response = await axios.delete(`${base_url}/country/delete/${id}`);
  return response.data;
};

const deleteAllCountries = async () => {
  const response = await axios.delete(`${base_url}/country/delete-all`);
  return response.data;
};

const countryService = {
  addCountry,
  getAllCountries,
  updateCountry,
  deleteCountry,
  deleteAllCountries,
};

export default countryService;
