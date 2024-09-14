import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import toast from "react-hot-toast";
const initialState = {
  users: [],
  admins: [],
  managers: [],
  totalUsers: 0,
  selectedManager: null,
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

export const getManagerInfo = createAsyncThunk(
  "users/get-manager",
  async (id, thunkAPI) => {
    try {
      return await userService.getManagerInfo(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteManager = createAsyncThunk(
  "users/delete-manager",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteManager(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateManager = createAsyncThunk(
  "users/update-manager",
  async (id, thunkAPI) => {
    try {
      return await userService.updateManager(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllManagers = createAsyncThunk(
  "users/all-managers",
  async (data, thunkAPI) => {
    try {
      return await userService.getAllManagers(data);
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

export const addManager = createAsyncThunk(
  "users/add-manager",
  async (data, thunkAPI) => {
    try {
      return await userService.addManager(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toggleDarkMode = createAsyncThunk(
  "admin/dark-mode",
  async (data, thunkAPI) => {
    try {
      return await userService.toggleDarkMode(data);
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
      .addCase(getAllManagers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllManagers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.managers = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.message = "success";
        // console.log("Fulfilled - Data:", action.payload);
        // console.log("Fulfilled - Users Data:", action.payload.user);
        // console.log("Fulfilled - Total Users:", action.payload.totalUsers);
      })
      .addCase(getAllManagers.rejected, (state, action) => {
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
        state.isError = false;
        state.isSuccess = true;
        state.message = "User deleted successfully";
        state.managers = state.managers.filter(
          (manager) => manager._id !== action.payload._id
        );
        state.totalUsers = state.totalUsers - 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error(action.error.message);
        }
      })
      .addCase(getManagerInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManagerInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Manager Info Retrieved";
        state.selectedManager = action.payload;
        toast.success(state.message);
      })
      .addCase(getManagerInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(addManager.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Manager Added successfully";
        state.managers = [...state.managers, action.payload];
        toast.success(state.message);
      })
      .addCase(addManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(deleteManager.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Manager Deleted successfully";
        toast.success(state.message);
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(updateManager.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Manager updated successfully";
        state.managers = state.managers.map((manager) =>
          manager._id === action.payload.id
            ? { ...manager, ...action.payload.data }
            : manager
        );
        toast.success(state.message);
      })
      .addCase(updateManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(state.message);
      })
      .addCase(toggleDarkMode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleDarkMode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "mode changed successfully";
      })
      .addCase(toggleDarkMode.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
