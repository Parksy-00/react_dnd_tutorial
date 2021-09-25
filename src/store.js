import { configureStore } from '@reduxjs/toolkit';
import pieceReducer from './state/PieceSlice';
import boardReducer from './state/BoardSlice';

export const store = configureStore({
    reducer: {
        pieces: pieceReducer,
        board: boardReducer
    },
})
