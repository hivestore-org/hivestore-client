import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./cartRedux";
//import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authentication/authSlice";
// import productSlice from "./productSlice";
// import storage from 'redux-persist/lib/storage';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const rootReducer = combineReducers({ user: userSlice, product: productSlice });

// const persistedReducer = persistReducer(persistConfig, rootReducer);



// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//                 serializableCheck: {
//                     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//                 },
//             }),
// });

// export let persistor = persistStore(store);

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

