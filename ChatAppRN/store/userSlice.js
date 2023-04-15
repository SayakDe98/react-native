import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: ''
    },
    reducers: {
        loginUser: (state, action) => {
            state.username = action.payload.username
        }
    }
})

export const loginUser = userSlice.actions.loginUser;
export default userSlice.reducer;