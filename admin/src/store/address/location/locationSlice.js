import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import locationService from "./locationService";
import toast from "react-hot-toast";

const initialState = {
  locations: [],
  totalLocations: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addLocation = createAsyncThunk(
  "location/add-location",
  async (data, thunkAPI) => {
    try {
      return await locationService.addLocation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllLocations = createAsyncThunk(
  "location/all-locations",
  async (thunkAPI) => {
    try {
      return await locationService.getAllLocations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/update-location",
  async (data, thunkAPI) => {
    try {
      return await locationService.updateLocation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/delete-location",
  async (id, thunkAPI) => {
    try {
      return await locationService.deleteLocation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllLocations = createAsyncThunk(
  "location/delete-locations",
  async (thunkAPI) => {
    try {
      return await locationService.deleteAllLocations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(addLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "success";
        state.isSuccess = true;
        state.createdLocation = action.payload;
        if (state.isSuccess === true) {
          toast.success("Location Added Successfully");
        }
        state.locations = [...state.locations, action.payload];
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllLocations.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.locations = action.payload;
      })
      .addCase(getAllLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.locations = state.locations.map((location) =>
          location._id === action.payload._id ? action.payload : location
        );
        if (state.isSuccess === true) {
          toast.success("Location updated Successfully");
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.locations = state.locations.filter(
          (location) => location._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Location Deleted Successfully");
        }
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllLocations.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.locations = [];
        if (state.isSuccess === true) {
          toast.success("All Locations Deleted Successfully");
        }
      })
      .addCase(deleteAllLocations.rejected, (state, action) => {
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

export default locationSlice.reducer;
