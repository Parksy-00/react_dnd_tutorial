import { configureStore } from '@reduxjs/toolkit';
import knightReducer from './state/KnightSlice';
import bishopReducer from './state/BishopSlice';
import rookReducer from './state/RookSlice';

export const store = configureStore({
    reducer: {
        knight: knightReducer,
        bishop: bishopReducer,
        rook: rookReducer,
    },
})
