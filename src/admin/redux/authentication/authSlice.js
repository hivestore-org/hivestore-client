import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin } from './authActions';

const user = localStorage.getItem('admin');

const initialState = {
    user: user ? user : null,
    loading: false,
    error: false,
    success: false,
    message: '',
}

const authSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: state => {
            state.loading = false;
            state.error = false;
            state.message = false;
            state.success = false;
        },
        logout: state => {
            localStorage.removeItem('admin');
            state.user = null;
            state.loading = false;
            state.error = false;
            state.message = '';
            state.success = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginAdmin.pending, state => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.error = true;
                state.message = action.payload;
                state.loading = false;
                state.success = false
            })
    }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;