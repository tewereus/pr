//problem: on pagnation, going to another page(page 2) and then setting the limit produces " this page does not exist error"
import { base_url, config } from "../../../api/axiosConfig";
import axios from "axios";

const getAllAdmins = async ({
  page,
  limit,
  search,
  sort,
  searchField,
  blocked,
}) => {
  const response = await axios.get(
    `${base_url}/admin/all-admins?page=${page}&limit=${limit}&sort=${sort}&search=${search}&searchField=${searchField}&isBlocked=${blocked}`,
    config
  );
  // console.log(response.data);
  return response.data;
};

const adminService = {
  getAllAdmins,
};

export default adminService;
