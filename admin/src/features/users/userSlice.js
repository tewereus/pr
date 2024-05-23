import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  admins: [],
  totalUsers: 0,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "users/all-users",
  async (data, thunkAPI) => {
    try {
      return await userService.getAllUsers(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "users/all-admins",
  async (data, thunkAPI) => {
    try {
      return await userService.getAllAdmins(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete-user",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllUsers = createAsyncThunk(
  "users/delete-alluser",
  async (thunkAPI) => {
    try {
      return await userService.deleteAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.message = "success";
        // console.log("Fulfilled - Data:", action.payload);
        // console.log("Fulfilled - Users Data:", action.payload.user);
        // console.log("Fulfilled - Total Users:", action.payload.totalUsers);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.message = "success";
        // console.log("Fulfilled - Data:", action.payload);
        // console.log("Fulfilled - Users Data:", action.payload.user);
        // console.log("Fulfilled - Total Users:", action.payload.totalUsers);
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.message = "success";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default userSlice.reducer;
