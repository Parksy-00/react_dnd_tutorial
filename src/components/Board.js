import React from 'react';
import Knight from './Knight';
import Bishop from './Bishop';
import BoardSquare from './BoardSquare';
import { useSelector } from 'react-redux';

export default function Board() {
    const knightPos = useSelector((state) => state.knight);
    const BishopPos = useSelector((state) => state.bishop);

    const squares = [];
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPos, BishopPos));
    }

    function renderSquare(i, {knightX, knightY}, {bishopX, bishopY}) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isKnight = (x === knightX && y === knightY);
        const isBishop = (x === bishopX && y === bishopY);
    
        return (
            <div 
                key={i} style={{width:'12.5%', height:'12.5%', margin:0}}
            >
                <BoardSquare x={x} y={y}>
                    {isKnight && <Knight/>}
                    {isBishop && <Bishop/>}
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
