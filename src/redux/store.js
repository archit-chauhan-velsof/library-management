import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './Reducers/bookSlice';

export const store = configureStore({
    reducer : {
        books : bookReducer,
    },
    // devTools : true
});
