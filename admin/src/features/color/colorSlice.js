import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";
import toast from "react-hot-toast";

const initialState = {
    colors: [],
    totalColors: 0,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const addColor = createAsyncThunk(
    "colors/add-color",
    async (data, thunkAPI)=>{
        try {
            return await colorService.addColor(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllColors = createAsyncThunk(
    "colors/all-colors",
    async (thunkAPI) => {
        try {
            return await colorService.getAllColors()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateColor = createAsyncThunk(
    "colors/update-color",
    async (data, thunkAPI) => {
        try {
            return await colorService.updateColor(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteColor = createAsyncThunk(
    "colors/delete-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.deleteColor(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteAllColors = createAsyncThunk(
    "colors/delete-colors",
    async (thunkAPI) => {
        try {
            return await colorService.deleteAllColors()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(addColor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addColor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = "success"
                state.isSuccess = true
                state.createdColor = action.payload
                if (state.isSuccess === true) {
                  toast.success("Color Added Successfully");
                }
                state.colors = [...state.colors, action.payload]
            })
            .addCase(addColor.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.error
            })
            .addCase(getAllColors.pending, (state) => {
                state.isLoading = false
            })
            .addCase(getAllColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "";
                state.colors = action.payload;
              })
              .addCase(getAllColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
              })
              .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(updateColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "";
                state.colors = state.colors.map((color) =>
                  color._id === action.payload._id ? action.payload : color
                );
                if (state.isSuccess === true) {
                  toast.success("Color updated Successfully");
                }
              })
              .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
              })
              .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "";
                state.colors = state.colors.filter(
                  (color) => color._id !== action.payload._id
                );
                if (state.isSuccess === true) {
                  toast.success("Color Deleted Successfully");
                }
              })
              .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                  toast.error(action.payload.response.data.message);
                }
              })
              .addCase(deleteAllColors.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(deleteAllColors.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "";
                state.colors = [];
                if (state.isSuccess === true) {
                  toast.success("All Colors Deleted Successfully");
                }
              })
              .addCase(deleteAllColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                  toast.error(action.payload.response.data.message);
                }
              })
    }
})

export default colorSlice.reducer