import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl = 'http://localhost:5000';
const user = JSON.parse(localStorage.getItem('user'));

export const addItemToCart = createAsyncThunk(
    'cart/addToCart/userId',
    async (userData, thunkAPI) => {
        let authTokens = localStorage.getItem("token");
        
        try {
            const res =  await axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/v1/cart/${user.user._id}`, userData, {
                headers: {
                    Authorization: `Bearer ${authTokens}`,
                }
            });
            const userCart = res.data;
           
            return userCart
        } catch (e) {
            const message = (e.response && e.res.data.message) || e.message;
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)