import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const registerUser = createAsyncThunk(
  'users/signup',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/signup`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message; 
      console.log(message);
      // reject with value sends the error message as a payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/login`, userData);
      if (response.data) {
        const { data, token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        return data.user;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      console.log(message);
      // reject with value sends the error message as a payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);