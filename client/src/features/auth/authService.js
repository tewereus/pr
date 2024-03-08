import axios from "axios";
import { base_url } from "../../api/axiosConfig";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

const login = async (user) => {
  const response = await axios.post(`${base_url}/user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${base_url}/user/register`, user);

  return response.data;
};

const viewProfile = async () => {
  const response = await axios.get("/user/profile", config);
  return response.data;
};
const authService = {
  login,
  register,
  viewProfile,
};

export default authService;
