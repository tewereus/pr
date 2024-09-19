import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";
import toast from "react-hot-toast";

const initialState = {
  images: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addImage = createAsyncThunk(
  "image/add-image",
  async (data, thunkAPI) => {
    try {
      return await imageService.addImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateImage = createAsyncThunk(
  "image/update-image",
  async (data, thunkAPI) => {
    try {
      return await imageService.updateImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "image/delete-image",
  async (id, thunkAPI) => {
    try {
      return await imageService.deleteImage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllImages = createAsyncThunk(
  "image/get-images",
  async (thunkAPI) => {
    try {
      return await imageService.getAllImages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllImages = createAsyncThunk(
  "image/delete-images",
  async (thunkAPI) => {
    try {
      return await imageService.deleteAllImages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const imageSlice = createSlice({
  name: "image",
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
      .addCase(addImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        if (state.isSuccess === true) {
          toast.success("Image Added Successfully");
        }
        state.images = [...state.images, action.payload];
      })
      .addCase(addImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(updateImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.images = state.images.map((image) =>
          image._id === action.payload._id ? action.payload : image
        );
        if (state.isSuccess === true) {
          toast.success("Image updated Successfully");
        }
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.images = state.images.filter(
          (image) => image._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Image Deleted Successfully");
        }
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "success";
        state.images = [];
        if (state.isSuccess === true) {
          toast.success("All images Deleted Successfully");
        }
      })
      .addCase(deleteAllImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getAllImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.images = action.payload;
      })
      .addCase(getAllImages.rejected, (state, action) => {
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

export const { messageClear, user_reset } = imageSlice.actions;

export default imageSlice.reducer;
