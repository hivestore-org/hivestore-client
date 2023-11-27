import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from 'axios';

const baseUrl = 'http://localhost:5000'

export const loginAdmin = createAsyncThunk('users/login', async (userData, thunkAPI) => {
    let authTokens = localStorage.getItem("token");
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/v1/users/admin/login`, userData, {
            headers: {
                Authorization: `Bearer ${authTokens}`,
            }
        });
        if (res.data) {
            const { token, data } = res.data;
            // localStorage.setItem('token', token);
            localStorage.setItem('admin', JSON.stringify(data.user));
            return data.user;
        }
    } catch (error) {
        const message = (error.res && error.res.data.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})