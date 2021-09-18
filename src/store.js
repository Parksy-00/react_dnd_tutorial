import { configureStore } from '@reduxjs/toolkit';
import pieceReducer from './state/PieceSlice';

export const store = configureStore({
    reducer: {
        pieces: pieceReducer
    },
})
