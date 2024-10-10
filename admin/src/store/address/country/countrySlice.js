import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import countryService from "./countryService";
import toast from "react-hot-toast";

const initialState = {
  countries: [],
  totalCountries: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addCountry = createAsyncThunk(
  "country/add-country",
  async (data, thunkAPI) => {
    try {
      return await countryService.addCountry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllCountries = createAsyncThunk(
  "country/all-countries",
  async (thunkAPI) => {
    try {
      return await countryService.getAllCountries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCountry = createAsyncThunk(
  "country/update-country",
  async (data, thunkAPI) => {
    try {
      return await countryService.updateCountry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCountry = createAsyncThunk(
  "country/delete-country",
  async (id, thunkAPI) => {
    try {
      return await countryService.deleteCountry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllCountries = createAsyncThunk(
  "country/delete-countries",
  async (thunkAPI) => {
    try {
      return await countryService.deleteAllCountries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(addCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "success";
        state.isSuccess = true;
        state.createdCountry = action.payload;
        if (state.isSuccess === true) {
          toast.success("Country Added Successfully");
        }
        state.countries = [...state.countries, action.payload];
      })
      .addCase(addCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllCountries.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.countries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.countries = state.countries.map((country) =>
          country._id === action.payload._id ? action.payload : country
        );
        if (state.isSuccess === true) {
          toast.success("Country updated Successfully");
        }
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.countries = state.countries.filter(
          (country) => country._id !== action.payload._id
        );
        if (state.isSuccess === true) {
          toast.success("Country Deleted Successfully");
        }
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(deleteAllCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllCountries.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.countries = [];
        if (state.isSuccess === true) {
          toast.success("All Countries Deleted Successfully");
        }
      })
      .addCase(deleteAllCountries.rejected, (state, action) => {
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

export default countrySlice.reducer;
