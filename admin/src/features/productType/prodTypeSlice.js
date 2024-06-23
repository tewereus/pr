import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import prodTypeService from "./prodTypeService";
import toast from "react-hot-toast";

const initialState = {
  productTypes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addProductType = createAsyncThunk(
  "product/add-productType",
  async (data, thunkAPI) => {
    try {
      return await prodTypeService.addProductType(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProdType = createAsyncThunk(
  "product/update-product",
  async (data, thunkAPI) => {
    try {
      return await prodTypeService.updateProdType(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProdType = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await prodTypeService.deleteProdType(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProdTypes = createAsyncThunk(
  "product/get-productTypes",
  async (thunkAPI) => {
    try {
      return await prodTypeService.getAllProdTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllProdTypes = createAsyncThunk(
  "product/delete-productTypes",
  async (thunkAPI) => {
    try {
      return await prodTypeService.deleteAllProdTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const prodTypeSlice = createSlice({
  name: "productType",
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
      .addCase(addProductType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.currentType = action.payload;
        state.productTypes = [...state.productTypes, action.payload];

        if (state.isSuccess === true) {
          toast.success("Product Type Added Successfully");
        }
      })
      .addCase(addProductType.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(updateProdType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProdType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.productTypes = state.productTypes.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProdType.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteProdType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProdType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.productTypes = state.productTypes.filter(
          (product) => product._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Product Deleted Successfully");
        }
      })
      .addCase(deleteProdType.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllProdTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllProdTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.productTypes = [];
        if (state.isSuccess === true) {
          toast.success("All Products Deleted Successfully");
        }
      })
      .addCase(deleteAllProdTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getAllProdTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProdTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.productTypes = action.payload;
      })
      .addCase(getAllProdTypes.rejected, (state, action) => {
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

export const { messageClear, user_reset } = prodTypeSlice.actions;

export default prodTypeSlice.reducer;
