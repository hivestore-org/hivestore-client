import { createSlice } from "@reduxjs/toolkit";
import { addProduct } from "./productActions";

const initialState = {
    products: [],
    isFetching: false,
    success: false,
    error: false,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => {
            state.isFetching = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addProduct.pending, state => {
                state.isFetching = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.success = true;
                state.products.push(action.payload);
                state.isFetching = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.success = false;
                state.isFetching = false;
                state.error = action.payload;
            })
    }
    
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;

// reducers: {
//     //Get all
//     getProductStart: (state) => {
//         state.isFetching = true;
//         state.error = false;
//     },
//     getProductSuccess: (state, action) => {
//         state.isFetching = false;
//         state.products = action.payload;
//     },
//     getProductFailure: (state) => {
//         state.error = true;
//     },
//     //Delete
//     deleteProductStart: (state) => {
//         state.isFetching = true;
//         state.error = false;
//     },
//     deleteProductSuccess: (state, action) => {
//         state.isFetching = false;
//         state.products.splice(
//             state.products.findIndex(item => item._id === action.payload.id), 1
//         );
//     },
//     deleteProductFailure: (state) => {
//         state.error = true;
//     },
//     //Update
//     updateProductStart: (state) => {
//         state.isFetching = true;
//         state.error = false;
//     },
//     updateProductSuccess: (state, action) => {
//         state.isFetching = false;
//         state.products[
//             state.products.findIndex(item => item._id === action.payload.id)
//         ] = action.payload.user;
//     },
//     updateProductFailure: (state) => {
//         state.error = true;
//     },
//     //add new item
//     newProductStart: (state) => {
//         state.isFetching = true;
//         state.error = false;
//     },
//     newProductSuccess: (state, action) => {
//         state.isFetching = false;
//         state.products[
//             state.products.findIndex(item => item._id === action.payload.id)
//         ] = action.payload.user;
//     },
//     newProductFailure: (state) => {
//         state.error = true;
//     }
// },