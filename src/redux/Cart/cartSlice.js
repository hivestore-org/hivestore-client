import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart } from "./cartActions";

const getCartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

let total_quantity = getCartItemsFromLocalStorage.length;

const initialState = {
    cartItems : { products: getCartItemsFromLocalStorage },
    totalQuantity: total_quantity,
    isLoading: true,
    error: false,
    message: '',
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem(state, action) {
            const newItem = action.payload;

            //Check if item is already available
            const existingItem = state.cartItems.products.find((item) => item._id === newItem._id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price
            } else  {
                state.cartItems.products = [
                    ...state.cartItems.products,
                   {
                        _id: newItem._id,
                        price: newItem.price,
                        quantity: 1,
                        totalPrice: newItem.price,
                        name: newItem.name,
                        imgUrl: newItem.imgUrl,
                        size: newItem.size,
                        color: newItem.color
                    }
                ]
                ;
                state.totalQuantity++;
                localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            }
            state.isLoading = false;
            localStorage.setItem("cart", JSON.stringify(state.cartItems.products));
           
        },
        increase(state, { payload }) {
            const cartItem = state.cartItems.products.find(item =>  item._id === payload._id );

           if (cartItem) {
            cartItem.quantity++;
            cartItem.totalPrice = cartItem.price * cartItem.quantity;
           }
           state.isLoading = false;
           localStorage.setItem("cart", JSON.stringify(state.cartItems.products));
        },
        removeFromCart(state, action) {
            const id = action.payload;

            const existingItem = state.cartItems.products.find(item => item._id === id);
            if (existingItem.quantity === 1) {
                state.cartItems.products = state.cartItems.products.filter(item => item._id !== id)
                state.totalQuantity--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            }
            state.isLoading = false;
           localStorage.setItem("cart", JSON.stringify(state.cartItems.products));
           
        },
        setShowCart(state) {
            state.showCart = true;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addItemToCart.pending, state => {
                state.isLoading = true;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.error = true;
                state.message = action.payload;
            })
    }
});

export const {addCartItem, removeFromCart, increase} = cartSlice.actions;

export default cartSlice.reducer;