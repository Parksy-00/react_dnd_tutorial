import { configureStore } from '@reduxjs/toolkit';
import knightReducer from './state/knightSlice';
import bishopReducer from './state/BishopSlice';

export const store = configureStore({
    reducer: {
        knight: knightReducer,
        bishop: bishopReducer,
    },
})
