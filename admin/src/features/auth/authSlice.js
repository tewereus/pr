import {createSlice, createAsyncThunk} from '@reduxjs/toolikit'

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  