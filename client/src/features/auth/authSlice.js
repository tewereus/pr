import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import toast from 'react-hot-toast'

const getUserfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
   user: getUserfromLocalStorage,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
   try {
      return await authService.login(user)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const viewProfile = createAsyncThunk('auth/profile', async(thunkAPI) => {
    try {
        return await authService.viewProfile()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        messageClear: (state) => {
            state.isSuccess = false
            state.isError = false
        },
        user_reset: (state) => {
            state.user = ""
         }
    },
    extraReducers: (builder) => {
       builder
          .addCase(login.pending, (state) => {
             state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
             state.isError = false;
             state.isLoading = false;
             state.isSuccess = true;
             state.user = action.payload;
             state.message = "Success";
             if(state.isSuccess === true){
                localStorage.setItem('token', action.payload.token)
                toast.success("Logged in successfully")
             }
          })
          .addCase(login.rejected, (state, action) => {
             state.isLoading = false;
             state.isError = true;
             state.isSuccess = false;
             state.message =action.error;
             if(state.isError === true){
                toast.error(action.payload.response.data.message)
             }
          })
          .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = 'success'
            state.createdUser = action.payload
            if(state.isSuccess === true){
                toast.success('Registered Successfully')
            }
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
            if(state.isError === true){
                const validationError = action.payload.response.data.message.split(':')
                toast.error(validationError[0].trim())
            }
          })
          .addCase(viewProfile.pending, (state) => {
            state.isLoading = true
          })
          .addCase(viewProfile.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = 'success'
          })
          .addCase(viewProfile.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
          })
    }
})

export const {messageClear, user_reset} = authSlice.actions
export default authSlice.reducer