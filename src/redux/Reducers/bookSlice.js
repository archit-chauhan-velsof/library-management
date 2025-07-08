import {createSlice} from '@reduxjs/toolkit';
import booksData from '../../../Data/booksList.json';

const initialState = {
    books : booksData
};

const bookSlice = createSlice({
    name:'books',
    initialState,
    reducers:{
        addBook: (state,action) => {
            state.books.unshift(action.payload);
        }
    }
});

export const {addBook} = bookSlice.actions;
export default bookSlice.reducer;