import React from 'react';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Rook from './pieces/Rook';
import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import King from './pieces/King';
import BoardSquare from './BoardSquare';
import { useSelector } from 'react-redux';

export default function Board() {
    const pieces = useSelector((state) => state.pieces);
    const board = useSelector((state) => state.board);

    function renderSquare({id, type, x, y}) {
        const isKnight = type === 'knight';
        const isBishop = type === 'bishop';
        const isRook = type === 'rook';
        const isPawn = type === 'pawn';
        const isQueen = type === 'queen';
        const isKing = type === 'king';
        const isEmpty = type === 'none';

        return (
            <div
                key={x * 8 + y} style={{width:'12.5%', height:'12.5%', margin:0}}
            >
                <BoardSquare x={x} y={y} isEmpty={isEmpty}>
                    {isKnight && <Knight id={id}/>}
                    {isBishop && <Bishop id={id}/>}
                    {isRook && <Rook id={id}/>}
                    {isPawn && <Pawn id={id}/>}
                    {isQueen && <Queen id={id}/>}
                    {isKing && <King id={id}/>}
                </BoardSquare>
            </div>
        );
    }

    return (
            <div style={{width:'800px', height:'800px', display:'flex', flexWrap:'wrap'}}>
                { board.flat().map(square => renderSquare(square))}
            </div>
    )
}
