import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
    for (let y = 0; y < 8; y++) {
        initialState.push([]);
        for (let x = 0; x < 8; x++) {
            initialState[y][x] = {id: -1, type:'none', x, y}
        }
    }

const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        move: (state, action) => {
            const {id, type, x, y, toX, toY} = action.payload;
            state[y][x] = {id: -1, type: 'none', x, y};
            state[toY][toX] = {id, type, x: toX, y: toY};
        },
        create: (state, action) => {
            const {id, type, x, y} = action.payload;
            state[y][x] = {id, type, x, y};
        },
        deleteOne: (state, action) => {
            const {x, y} = action.payload;
            state[y][x] = {id: -1, x, y};
        }
    }
})

export const { move, create, deleteOne } = BoardSlice.actions;

export default BoardSlice.reducer;