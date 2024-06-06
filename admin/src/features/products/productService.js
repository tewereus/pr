import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const createProduct = async (data) => {
  const response = await axios.post(
    `${base_url}/product/create-product`,
    data,
    config
  );
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(
    `${base_url}/product/all-products`,
    null,
    config
  );
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}/product/${id}`, config);
  return response.data;
};

const updateProduct = async (id) => {
  const response = await axios.put(`${base_url}/product/${id}`, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}/product/${id}`, config);
  return response.data;
};

const deleteAllProducts = async () => {
  const response = await axios.delete(`${base_url}/product/delete-all`, config);
  return response.data;
};

// router.post("/create-product", adminAuthMiddleware, createCategory);
// router.get("/all-products", adminAuthMiddleware, getAllCategories);
// router.get("/:id", adminAuthMiddleware, getaCategory);
// router.put("/:id", adminAuthMiddleware, updateCategory);
// router.delete("/:id", adminAuthMiddleware, deleteCategory);
// router.delete("/delete-all", adminAuthMiddleware, deleteAllCategories);

const productService = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};

export default productService;
