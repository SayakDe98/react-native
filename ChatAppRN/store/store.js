import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./roomSlice";
import loginUserReducer from "./userSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
    reducer: {
        room: roomReducer,
        loginUser: loginUserReducer,
        message: messageReducer
    }
})