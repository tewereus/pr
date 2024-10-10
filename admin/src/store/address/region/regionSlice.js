import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionService from "./regionService";
import toast from "react-hot-toast";

const initialState = {
  regions: [],
  totalRegions: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addRegion = createAsyncThunk(
  "region/add-region",
  async (data, thunkAPI) => {
    try {
      return await regionService.addRegion(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllRegions = createAsyncThunk(
  "region/all-regions",
  async (thunkAPI) => {
    try {
      return await regionService.getAllRegions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateRegion = createAsyncThunk(
  "region/update-region",
  async (data, thunkAPI) => {
    try {
      return await regionService.updateRegion(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteRegion = createAsyncThunk(
  "region/delete-region",
  async (id, thunkAPI) => {
    try {
      return await regionService.deleteRegion(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllRegions = createAsyncThunk(
  "region/delete-regions",
  async (thunkAPI) => {
    try {
      return await regionService.deleteAllRegions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(addRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "success";
        state.isSuccess = true;
        state.createdRegion = action.payload;
        if (state.isSuccess === true) {
          toast.success("Region Added Successfully");
        }
        state.regions = [...state.regions, action.payload];
      })
      .addCase(addRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllRegions.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.regions = action.payload;
      })
      .addCase(getAllRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.regions = state.regions.map((region) =>
          region._id === action.payload._id ? action.payload : region
        );
        if (state.isSuccess === true) {
          toast.success("Region updated Successfully");
        }
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.regions = state.regions.filter(
          (region) => region._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Region Deleted Successfully");
        }
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllRegions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllRegions.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.regions = [];
        if (state.isSuccess === true) {
          toast.success("All Regions Deleted Successfully");
        }
      })
      .addCase(deleteAllRegions.rejected, (state, action) => {
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

export default regionSlice.reducer;
