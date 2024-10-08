import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "./addressService";
import toast from "react-hot-toast";

const initialState = {
  addresses: [],
  totalColors: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addAddress = createAsyncThunk(
  "address/add-address",
  async (data, thunkAPI) => {
    try {
      return await addressService.addAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllAddresses = createAsyncThunk(
  "address/all-address",
  async (thunkAPI) => {
    try {
      return await addressService.getAllAddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update-address",
  async (data, thunkAPI) => {
    try {
      return await addressService.updateAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete-address",
  async (id, thunkAPI) => {
    try {
      return await addressService.deleteAddress(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllAddresses = createAsyncThunk(
  "address/delete-addresses",
  async (thunkAPI) => {
    try {
      return await addressService.deleteAllAddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "success";
        state.isSuccess = true;
        state.createdAddress = action.payload;
        if (state.isSuccess === true) {
          toast.success("Address Added Successfully");
        }
        state.addresses = [...state.addresses, action.payload];
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllAddresses.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.addresses = action.payload;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.addresses = state.addresses.map((address) =>
          address._id === action.payload._id ? action.payload : address
        );
        if (state.isSuccess === true) {
          toast.success("Address updated Successfully");
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Address Deleted Successfully");
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllAddresses.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.addresses = [];
        if (state.isSuccess === true) {
          toast.success("All Addresses Deleted Successfully");
        }
      })
      .addCase(deleteAllAddresses.rejected, (state, action) => {
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

export default addressSlice.reducer;
