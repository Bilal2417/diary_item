import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { diarySlice } from "./diarySlice";

const mainReducer = combineReducers({
    diarySlice: diarySlice.reducer
});

export const mainStore = configureStore({
    reducer: mainReducer
});

