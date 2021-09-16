import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bishopX: 1,
    bishopY: 7
}

export const bishopSlice = createSlice({
    name: 'bishop',
    initialState,
    reducers: {
        moveBishop: (state, action) => {
            state.bishopX = action.payload.x;
            state.bishopY = action.payload.y;
        }
    }
})

export const { moveBishop } = bishopSlice.actions;

export default bishopSlice.reducer;