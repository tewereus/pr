import axios from "axios";
import { base_url } from "../../api/axiosConfig";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
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

const validateUser = async (data) => {
  const response = await axios.post(`${base_url}/user/validate-user`, data);
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${base_url}/user/register`, user);

  return response.data;
};

const verifyEmail = async (email) => {
  // console.log("sendOtp reached ")
  const response = await axios.post(`${base_url}/otp/send-otp`, { email });
  // console.log("message sent successfully")
  return response.data;
};

const enableTwoFactorAuth = async () => {
  try {
    const response = await axios.post(
      `${base_url}/user/enable-two-factor-auth`,
      null,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(`${base_url}/user/forgot-password`, data);

  if (response.data) {
    console.log(response.data);
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}/user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const viewProfile = async () => {
  const response = await axios.get(`${base_url}/user/profile`, config);
  return response.data;
};
const authService = {
  login,
  validateUser,
  register,
  verifyEmail,
  viewProfile,
  forgotPasswordToken,
  resetPassword,
  enableTwoFactorAuth,
};

export default authService;
