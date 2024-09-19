import { base_url } from "../../api/axiosConfig";
import { config } from "../../api/axiosConfig";
import axios from "axios";

// const getTokenFromLocalStorage = localStorage.getItem("admin")
//   ? JSON.parse(localStorage.getItem("admin"))
//   : null;

const adminLogin = async (data) => {
  const response = await axios.post(`${base_url}/admin/login`, data);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }
  return response.data;
};

const allUsers = async (data) => {
  const response = await axios.post(`${base_url}/user/all-users`, config);
  return response.data;
};

const checkAdminPass = async (data) => {
  const response = await axios.post(`${base_url}/admin/check-admin`, data);
  return response.data;
};

const uploadProfile = async (data) => {
  console.log(data);
  console.log("Uploading profile...");

  const getTokenFromLocalStorage = localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null;

  const response = await axios.post(`${base_url}/admin/upload-profile`, data, {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      // Accept: "application/json",
    },
    withCredentials: true,
  });

  console.log("Profile upload response:", response.data);

  return response.data;
};

const toggleDarkMode = async (data) => {
  // console.log(config);
  const getTokenFromLocalStorage = localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null;

  const response = await axios.post(`${base_url}/admin//dark-mode`, data, {
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
  adminLogin,
  allUsers,
  checkAdminPass,
  uploadProfile,
  toggleDarkMode,
};

export default authService;
