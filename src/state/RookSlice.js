import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rookX: 0,
    rookY: 7
}

export const rookSlice = createSlice({
    name: 'rook',
    initialState,
    reducers: {
        moveRook: (state, action) => {
            state.rookX = action.payload.x;
            state.rookY = action.payload.y;
        }
    }
})

export const { moveRook } = rookSlice.actions;

export default rookSlice.reducer;