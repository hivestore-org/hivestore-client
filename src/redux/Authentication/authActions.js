import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const registerUser = createAsyncThunk(
  'users/signup',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/signup`, userData);
      if (response.data) {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpritation', response.data.exp);
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
      console.log(response)
      if (response.data) {
        const { data, token, exp } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('tokenExpritation', exp);
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
