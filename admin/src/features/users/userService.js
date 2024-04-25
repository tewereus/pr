import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const getAllUsers = async ({ page, limit, sort, role }) => {
  const response = await axios.get(
    `${base_url}/user/all-users?page=${page}&&limit=${limit}&&sort=${sort}&&role=${role}`
  );
  console.log(response.data);
  return response.data;
};

const userService = {
  getAllUsers,
};

export default userService;
