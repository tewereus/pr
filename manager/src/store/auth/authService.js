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

const authService = {
  verifyManager,
  // verifyPassword,
  managerInfo,
};

export default authService;
