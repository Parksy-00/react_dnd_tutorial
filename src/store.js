import { configureStore } from '@reduxjs/toolkit';
import knightReducer from './state/knightSlice';

export const store = configureStore({
    reducer: {
        knight: knightReducer,
    },
})
