import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

// const initialState = {
//     1: {
//         id: 1,
//         type: 'knight',
//         x: 2,
//         y: 7
//     }, 
//     2: {
//         id: 2,
//         type: 'bishop',
//         x: 1,
//         y: 7
//     },
//     3: {
//         id: 3,
//         type: 'rook',
//         x: 0,
//         y: 7
//     },
//     4: {
//         id: 4,
//         type: 'knight',
//         x: 5,
//         y: 7
//     },
//     5: {
//         id: 5,
//         type: 'bishop',
//         x: 6,
//         y: 7
//     },
//     6: {
//         id: 6,
//         type: 'rook',
//         x: 7,
//         y: 7
//     },
//     7: {
//         id: 7,
//         type: 'queen',
//         x: 3,
//         y: 7
//     },
//     8: {
//         id: 8,
//         type: 'king',
//         x: 4,
//         y: 7
//     }
// }
// for (let x = 0; x < 8; x++) {
//     const y = 6;
//     const id = Object.keys(initialState).length + 1;
//     initialState[id] = {id, x, y, type: 'pawn'}
// }

const pieceSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        movePiece: (state, action) => {
            const piece = state[action.payload.id];
            piece.x = action.payload.x;
            piece.y = action.payload.y;
        },
        addPiece: (state, action) => {
            const keys = Object.keys(state);
            const newId = keys.length === 0 ? 1 : (Number(keys[keys.length - 1]) + 1);
            state[newId] = {id: newId, type: action.payload.type, x: action.payload.x, y: action.payload.y}
        }
    }
});

export const { movePiece, addPiece } = pieceSlice.actions;

export default pieceSlice.reducer;