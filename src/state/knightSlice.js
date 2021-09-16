import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    knightX: 2,
    knightY: 7
}

export const knightSlice = createSlice({
    name: 'knight',
    initialState,
    reducers: {
        moveKnight: (state, action) => {
            state.knightX = action.payload.x;
            state.knightY = action.payload.y;
        }
    }
})

export const { moveKnight } = knightSlice.actions;

export default knightSlice.reducer;