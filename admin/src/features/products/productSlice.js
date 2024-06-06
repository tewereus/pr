import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
