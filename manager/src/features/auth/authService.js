import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const verifyManager = async (data) => {
  const response = await axios.post(
    `${base_url}/manager/manager/${data.token}`,
    data.data
  );
  return response.data;
};

const authService = {
  verifyManager,
};

export default authService;
