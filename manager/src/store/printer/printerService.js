import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addPrinters = async (data) => {
  const getTokenFromLocalStorage = localStorage.getItem("manager")
    ? JSON.parse(localStorage.getItem("manager"))
    : null;

  const response = await axios.post(`${base_url}/manager/add-printers`, data, {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      // Accept: "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

const getAllPrinters = async () => {
  const getTokenFromLocalStorage = localStorage.getItem("manager")
    ? JSON.parse(localStorage.getItem("manager"))
    : null;

  const response = await axios.get(`${base_url}/manager/all-printers`, {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      // Accept: "application/json",
    },
    withCredentials: true,
  });

  return response.data;
};

const printerService = {
  addPrinters,
  getAllPrinters,
};

export default printerService;
