import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imgTypeService from "./imgTypeService";
import toast from "react-hot-toast";

const initialState = {
  imageTypes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addImageType = createAsyncThunk(
  "image/add-type",
  async (data, thunkAPI) => {
    try {
      return await imgTypeService.addImageType(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateImageType = createAsyncThunk(
  "image/update-type",
  async (data, thunkAPI) => {
    try {
      return await imgTypeService.updateImageType(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImageType = createAsyncThunk(
  "image/delete-type",
  async (id, thunkAPI) => {
    try {
      return await imgTypeService.deleteImageType(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllImgTypes = createAsyncThunk(
  "image/get-types",
  async (thunkAPI) => {
    try {
      return await imgTypeService.getAllImgTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllImgTypes = createAsyncThunk(
  "image/delete-types",
  async (thunkAPI) => {
    try {
      return await imgTypeService.deleteAllImgTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const imgCategorySlice = createSlice({
  name: "imageType",
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
      .addCase(addImageType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addImageType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        if (state.isSuccess === true) {
          toast.success("Image Type Added Successfully");
        }
        state.imageTypes = [...state.imageTypes, action.payload];
      })
      .addCase(addImageType.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(updateImageType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImageType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.imageTypes = state.imageTypes.map((type) =>
          type._id === action.payload._id ? action.payload : type
        );
        if (state.isSuccess === true) {
          toast.success("Image Type updated Successfully");
        }
      })
      .addCase(updateImageType.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteImageType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImageType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.imageTypes = state.imageTypes.filter(
          (type) => type._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Image Type Deleted Successfully");
        }
      })
      .addCase(deleteImageType.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllImgTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllImgTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "success";
        state.imageTypes = [];
        if (state.isSuccess === true) {
          toast.success("All Types Deleted Successfully");
        }
      })
      .addCase(deleteAllImgTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getAllImgTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllImgTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.imageTypes = action.payload;
      })
      .addCase(getAllImgTypes.rejected, (state, action) => {
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

export const { messageClear, user_reset } = imgCategorySlice.actions;

export default imgCategorySlice.reducer;
