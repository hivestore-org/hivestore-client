import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart } from "./cartActions";

const getCartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
const getTotalQuantityFromLocalStorage = JSON.parse(localStorage.getItem("totalQuantity")) || 0;

const initialState = {
    cartItems : {products: getCartItemsFromLocalStorage},
    totalQuantity: getTotalQuantityFromLocalStorage,
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
            const existingItem = state.cartItems.products.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price
            } else  {
                state.cartItems.products = [
                    ...state.cartItems.products,
                   {
                        id: newItem.id,
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
            console.log(localStorage.setItem("cart", JSON.stringify(state.cartItems.products)));
           
        },
        increase(state, { payload }) {
            const cartItem = state.cartItems.products.find(item => { item.id === payload.id });
           if (cartItem) {
            cartItem.quantity++;
           }
        },
        removeFromCart(state, action) {
            const id = action.payload;

            const existingItem = state.cartItems.products.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.products.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
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