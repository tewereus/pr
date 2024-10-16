import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";

const getTokenFromLocalStorage = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin"))
  : null;

const initialState = {
  user: getTokenFromLocalStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (data, thunkAPI) => {
    try {
      return await authService.adminLogin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const allUsers = createAsyncThunk("auth/get-users", async (thunkAPI) => {
  try {
    return await authService.allUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const checkAdminPass = createAsyncThunk(
  "auth/check-admin",
  async (data, thunkAPI) => {
    try {
      return await authService.checkAdminPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadProfile = createAsyncThunk(
  "auth/profile-upload",
  async (data, thunkAPI) => {
    try {
      return await authService.uploadProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toggleDarkMode = createAsyncThunk(
  "admin/dark-mode",
  async (data, thunkAPI) => {
    try {
      return await authService.toggleDarkMode(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.user = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(checkAdminPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAdminPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Password verified";
        console.log("password verified");
      })
      .addCase(checkAdminPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(uploadProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "profile uploaded";
        console.log("userInfo: ", action.payload.userInfo);
        if (action.payload.userInfo) {
          state.user.image = action.payload.userInfo.image;
        }
        toast.success(state.message);
      })
      .addCase(uploadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(toggleDarkMode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleDarkMode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "mode changed successfully";
        if (action.payload.preference) {
          state.user.preference.mode = action.payload.preference.mode;
        }
        toast.success(state.message);
      })
      .addCase(toggleDarkMode.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const { messageClear, user_reset } = authSlice.actions;

export default authSlice.reducer;
