import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import toast from "react-hot-toast";

const initialState = {
  products: [],
  productTypes: [],
  totalProducts: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createProduct = createAsyncThunk(
  "product/create-product",
  async (data, thunkAPI) => {
    try {
      return await productService.createProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/all-products",
  async (thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (data, thunkAPI) => {
    try {
      return await productService.updateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllProducts = createAsyncThunk(
  "product/delete-allproducts",
  async (thunkAPI) => {
    try {
      return await productService.deleteAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadProductImages = createAsyncThunk(
  "product/upload-product-image",
  async (data, thunkAPI) => {
    try {
      const { id, formData } = data;
      return await productService.uploadProductImages(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await productService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
    user_reset: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.createdProduct = action.payload;
        state.products = [...state.products, action.payload];

        if (state.isSuccess === true) {
          toast.success("Product added Successfully");
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Product Deleted Successfully");
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.products = [];
        if (state.isSuccess === true) {
          toast.success("All Products Deleted Successfully");
        }
      })
      .addCase(deleteAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        // state.products = [];   // check if there is ana error
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(uploadProductImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProductImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadProductImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        console.log("success");
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        console.log("failed");
      });
  },
});

export const { messageClear, user_reset } = productSlice.actions;

export default productSlice.reducer;
