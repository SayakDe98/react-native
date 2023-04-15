import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload.message)
        }
    }
});

export const addMessage = messageSlice.actions.addMessage;
export default messageSlice.reducer;