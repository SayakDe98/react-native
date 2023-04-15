import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: []
    },
    reducers: {
        addRoom: (state, action) => {
            state.rooms.push(action.payload.room)
        }
    }
})

export const addRoom = roomSlice.actions.addRoom;
export default roomSlice.reducer;