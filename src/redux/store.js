import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Authentication/authSlice';
import cartReducer from './Cart/cartSlice';
import adminAuthReducer from '../admin/redux/authentication/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    cart: cartReducer,
  },
});
