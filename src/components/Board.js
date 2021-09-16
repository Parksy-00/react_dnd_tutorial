import React from 'react';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Rook from './pieces/Rook';
import BoardSquare from './BoardSquare';
import { useSelector } from 'react-redux';

export default function Board() {
    const knightPos = useSelector((state) => state.knight);
    const bishopPos = useSelector((state) => state.bishop);
    const rookPos = useSelector((state) => state.rook);

    const squares = [];
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPos, bishopPos, rookPos));
    }

    function renderSquare(i, {knightX, knightY}, {bishopX, bishopY}, {rookX, rookY}) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isKnight = (x === knightX && y === knightY);
        const isBishop = (x === bishopX && y === bishopY);
        const isRook = (x === rookX && y === rookY);
        const isFull = isKnight || isBishop || isRook;
    
        return (
            <div 
                key={i} style={{width:'12.5%', height:'12.5%', margin:0}}
            >
                <BoardSquare x={x} y={y} isFull={isFull}>
                    {isKnight && <Knight/>}
                    {isBishop && <Bishop/>}
                    {isRook && <Rook/>}
                </BoardSquare>
            </div>
        );
    }

    return (
            <div style={{width:'800px', height:'800px', display:'flex', flexWrap:'wrap'}}>
                { squares }
            </div>
    )
}
