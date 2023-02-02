import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: {
        id: '',
        name: '',
        email: '',
        fullname: ''
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state = Object.assign(state, initialState);
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
