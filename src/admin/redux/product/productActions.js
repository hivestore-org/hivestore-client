import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// export const getProducts = async (dispatch) => {
//     dispatch(getProductStart());
//     try {
//         const res = await publicRequest.get("/products");
//         dispatch(getProductSuccess(res.data));
//     }catch (e) {
//         dispatch(getProductFailure());
//     }
// };

// export const deleteProducts = async (id, dispatch) => {
//     dispatch(deleteProductStart());
//     try {
//         const res = await publicRequest.delete(`/products/${id}`);
//         dispatch(deleteProductSuccess(id));
//     }catch (e) {
//         dispatch(deleteProductFailure());
//     }
// };

export const addProduct = createAsyncThunk('products/addProduct', async (productData, thunkAPI) => {
  try {
    const response = await axios.post('/api/v1/products', productData);
    console.log(response.data);
    return response.data;
  }catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    return thunkAPI.rejectWithValue(message)
  }
  });