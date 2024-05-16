import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  users: [],
  totalUsers: 0,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllAdmins = createAsyncThunk(
  "users/all-admins",
  async (data, thunkAPI) => {
    try {
      return await adminService.getAllAdmins(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const adminSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.users;
        // state.totalUsers = action.payload.totalUsers;
        state.message = "success";
        console.log("Fulfilled - Data:", action.payload);
        // console.log("Fulfilled - Users Data:", action.payload.user);
        // console.log("Fulfilled - Total Users:", action.payload.totalUsers);
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default adminSlice.reducer;
