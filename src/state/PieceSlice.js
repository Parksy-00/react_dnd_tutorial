import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    1: {
        id: 1,
        type: 'knight',
        x: 2,
        y: 7
    }, 
    2: {
        id: 2,
        type: 'bishop',
        x: 1,
        y: 7
    },
    3: {
        id: 3,
        type: 'rook',
        x: 0,
        y: 7
    }
}

const pieceSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        movePiece: (state, action) => {
            const piece = state[action.payload.id];
            piece.x = action.payload.x;
            piece.y = action.payload.y;
        },
    }
});

export const { movePiece } = pieceSlice.actions;

export default pieceSlice.reducer;