import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";

const getTokenFromLocalStorage = localStorage.getItem("manager")
  ? JSON.parse(localStorage.getItem("manager"))
  : null;

const initialState = {
  user: getTokenFromLocalStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const verifyManager = createAsyncThunk(
  "auth/verify-manager",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyManager(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const verifyPassword = createAsyncThunk(
//   "auth/verify-password",
//   async (data, thunkAPI) => {
//     try {
//       return await authService.verifyPassword(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const managerInfo = createAsyncThunk(
  "auth/verify-password",
  async (data, thunkAPI) => {
    try {
      return await authService.managerInfo(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const toggleDarkMode = createAsyncThunk(
  "manager/dark-mode",
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
    resetAuthState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
    user_reset: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyManager.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "verified manager";
        state.user = action.payload;
        // console.log(state.user);
        toast.success("Manager Verified");
      })
      .addCase(verifyManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          const validationError =
            action.payload.response.data.message.split(":")[1];
          toast.error(validationError);
        }
      })
      // .addCase(verifyPassword.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(verifyPassword.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isError = false;
      //   state.message = "verified manager password";
      //   state.user = action.payload;
      //   toast.success("Welcome Manager");
      // })
      // .addCase(verifyPassword.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = false;
      //   state.isError = true;
      //   state.message = action.error;
      //   if (state.isError === true) {
      //     const validationError =
      //       action.payload.response.data.message.split(":")[1];
      //     toast.error(validationError);
      //   }
      // })
      .addCase(managerInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(managerInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "manager Info updated";
        // state.user = action.payload;
        toast.success(state.message);
      })
      .addCase(managerInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          const validationError =
            action.payload.response.data.message.split(":")[1];
          toast.error(validationError);
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Logged in successfully";
        state.user = action.payload;
        // console.log("user ", state.user);
        toast.success(state.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          const validationError =
            action.payload.response.data.message.split(":")[1];
          toast.error(validationError);
        }
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

export const { resetAuthState, user_reset } = authSlice.actions;

export default authSlice.reducer;
