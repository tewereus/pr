import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";

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
    async (id, thunkAPI) => {
        try {
            return await colorService.updateColor(id)
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
                state.message = "success",
                state.isSuccess = true
                state.createdColor = action.payload
                state.colors = [...state.colors, action.payload]
            })
            .addCase(addColor.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.error
            })
    }
})