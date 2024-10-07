import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const verifyManager = async (data) => {
  const response = await axios.post(
    `${base_url}/manager/manager/${data.token}`,
    data.data
  );
  if (response.data) {
    localStorage.setItem("manager", JSON.stringify(response.data));
  }
  return response.data;
};

const managerInfo = async (data) => {
  const response = await axios.put(
    `${base_url}/manager/manager/${data.token}/manager-info`,
    data.data
  );
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(
    `${base_url}/manager/manager/${data.token}/login`,
    data.data
  );
  if (response.data) {
    localStorage.setItem("manager", JSON.stringify(response.data));
  }
  return response.data;
};

const toggleDarkMode = async (data) => {
  // console.log(config);
  const getTokenFromLocalStorage = localStorage.getItem("manager")
    ? JSON.parse(localStorage.getItem("manager"))
    : null;

  const response = await axios.put(`${base_url}/manager/dark-mode`, data, {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      // Accept: "application/json",
    },
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};

const authService = {
  verifyManager,
  // verifyPassword,
  managerInfo,
  login,
  toggleDarkMode,
};

export default authService;
