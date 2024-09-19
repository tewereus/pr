import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imgCategoryService from "./imgCategoryService";
import toast from "react-hot-toast";

const initialState = {
  imgCategories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addImgCategory = createAsyncThunk(
  "image/add-category",
  async (data, thunkAPI) => {
    try {
      return await imgCategoryService.addImgCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateImgCategory = createAsyncThunk(
  "image/update-category",
  async (data, thunkAPI) => {
    try {
      return await imgCategoryService.updateImgCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImgCategory = createAsyncThunk(
  "image/delete-category",
  async (id, thunkAPI) => {
    try {
      return await imgCategoryService.deleteImgCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const allImgCategories = createAsyncThunk(
  "image/get-categories",
  async (thunkAPI) => {
    try {
      return await imgCategoryService.allImgCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImgCategories = createAsyncThunk(
  "image/delete-categories",
  async (thunkAPI) => {
    try {
      return await imgCategoryService.deleteImgCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const imgCategorySlice = createSlice({
  name: "imageCategory",
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
      .addCase(addImgCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addImgCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        if (state.isSuccess === true) {
          toast.success("Image Category Added Successfully");
        }
        state.imgCategories = [...state.imgCategories, action.payload];
      })
      .addCase(addImgCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(updateImgCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImgCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.imgCategories = state.imgCategories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
        if (state.isSuccess === true) {
          toast.success("Image Category updated Successfully");
        }
      })
      .addCase(updateImgCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteImgCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImgCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.imgCategories = state.imgCategories.filter(
          (category) => category._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Image Category Deleted Successfully");
        }
      })
      .addCase(deleteImgCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteImgCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImgCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "success";
        state.imgCategories = [];
        if (state.isSuccess === true) {
          toast.success("All Categories Deleted Successfully");
        }
      })
      .addCase(deleteImgCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(allImgCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allImgCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.imgCategories = action.payload;
      })
      .addCase(allImgCategories.rejected, (state, action) => {
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
