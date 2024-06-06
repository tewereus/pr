import { createSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  totalProducts: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const createProduct = asyncThunkCreator(
  "product/create-product",
  async (data, thunkAPI) => {
    try {
      return await productService.createProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getAllProducts = asyncThunkCreator(
  "product/all-products",
  async (thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getProduct = asyncThunkCreator(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateProduct = asyncThunkCreator(
  "product/update-product",
  async (id, thunkAPI) => {
    try {
      return await productService.updateProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteProduct = asyncThunkCreator(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteAllProducts = asyncThunkCreator(
  "product/delete-products",
  async (thunkAPI) => {
    try {
      return await productService.deleteAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.createdProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product added Successfully");
        }
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      });
  },
});

export default productSlice.reducer;
