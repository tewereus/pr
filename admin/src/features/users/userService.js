//problem: on pagnation, going to another page(page 2) and then setting the limit produces " this page does not exist error"
import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const getAllUsers = async ({
  page,
  limit,
  search,
  sort,
  searchField,
  blocked,
}) => {
  const response = await axios.get(
    `${base_url}/admin/all-users?page=${page}&limit=${limit}&sort=${sort}&search=${search}&searchField=${searchField}&isBlocked=${blocked}`,
    config
  );
  // console.log(response.data);
  return response.data;
};

const getAllAdmins = async ({ page, limit, search, sort, searchField }) => {
  const response = await axios.get(
    `${base_url}/admin/all-admins?page=${page}&limit=${limit}&sort=${sort}&search=${search}&searchField=${searchField}`,
    config
  );
  return response.data;
};

const getAllManagers = async ({ page, limit, search, searchField }) => {
  const response = await axios.get(
    `${base_url}/admin/all-managers?page=${page}&limit=${limit}&search=${search}&searchField=${searchField}`,
    config
  );
  return response.data;
};

const getManagerInfo = async (id) => {
  const response = await axios.get(`${base_url}/admin/get-manager/${id}`);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(
    `${base_url}/admin/get-user/${id}/delete`
  );
  return response.data;
};

const deleteAllUsers = async () => {
  const response = await axios.delete(`${base_url}/admin/all-users/delete`);
  return response.data;
};

const addManager = async (data) => {
  const response = await axios.post(`${base_url}/admin/add-manager`, data);
  return response.data;
};

const deleteManager = async (id) => {
  const response = await axios.delete(
    `${base_url}/admin/get-manager/${id}/delete`
  );
  return response.data;
};

const updateManager = async (data) => {
  const response = await axios.put(
    `${base_url}/admin/get-manager/${data.id}/update`,
    data.data
  );
  return response.data;
};

const toggleDarkMode = async (data) => {
  // console.log(config);
  const response = await axios.post(
    `${base_url}/admin/dark-mode`,
    data,
    config
  );
  console.log(response.data);
  return response.data;
};

const userService = {
  getAllUsers,
  getAllAdmins,
  getManagerInfo,
  deleteUser,
  deleteAllUsers,
  getAllManagers,
  addManager,
  deleteManager,
  updateManager,
  toggleDarkMode,
};

export default userService;
