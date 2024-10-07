import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import printerService from "./printerService";
import toast from "react-hot-toast";

const initialState = {
  printer: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addPrinters = createAsyncThunk(
  "printer/add-printer",
  async (data, thunkAPI) => {
    try {
      return await printerService.addPrinters(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const verifyPassword = createAsyncThunk(
//   "auth/verify-password",
//   async (data, thunkAPI) => {
//     try {
//       return await printerService.verifyPassword(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const getAllPrinters = createAsyncThunk(
  "printer/all-printers",
  async (thunkAPI) => {
    try {
      return await printerService.getAllPrinters();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const printerSlice = createSlice({
  name: "printer",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPrinters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPrinters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "printer added successfully";
        // state.printer = action.payload;
        // console.log(state.printer);
        toast.success(state.message);
      })
      .addCase(addPrinters.rejected, (state, action) => {
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
      .addCase(getAllPrinters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPrinters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Got all printers";
        state.printer = action.payload;
        toast.success(state.message);
      })
      .addCase(getAllPrinters.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          const validationError =
            action.payload.response.data.message.split(":")[1];
          toast.error(validationError);
        }
      });
  },
});

export const { resetAuthState } = printerSlice.actions;

export default printerSlice.reducer;
