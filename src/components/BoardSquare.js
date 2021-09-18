import React from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../Constants';
import { movePiece } from '../state/PieceSlice';
import Square from './Square'
import Overlay from './Overlay';

export default function BoardSquare({x, y, isEmpty, children}) {
    const black = (x + y) % 2 === 1;
    const dispatch = useDispatch();
    const pieces = useSelector((state) => state.pieces);

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: [ItemTypes.KNIGHT, ItemTypes.BISHOP, ItemTypes.ROOK],
            drop: (item, monitor) => {
                const id = item.id;
                dispatch(movePiece({id, x, y}));
            },
            canDrop: (item, monitor) => {
                const id = item.id
                return canMove(pieces[id], x, y);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            })
        }),
        [pieces]
    )

    function canMove(piece, toX, toY) {
        const dx = toX - piece.x;
        const dy = toY - piece.y;
        
        switch (piece.type) {
            case 'knight': {
                return isEmpty &&
                ((Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
                (Math.abs(dx) === 1 && Math.abs(dy) === 2))
            }
            case 'bishop': {
                return isEmpty &&
                Math.abs(dx) === Math.abs(dy)
            }
            case 'rook': {
                return isEmpty &&
                (dx === 0 || dy === 0)
            }
        }
    }
    
    return (
        <div
            ref={drop}
            style={{
                position:'relative',
                width:'100%',
                height:'100%'
            }}
        >
            <Square black={black}>{children}</Square>
            {isOver && !canDrop && <Overlay color="red"/>}
            {!isOver && canDrop && <Overlay color="yellow"/>}
            {isOver && canDrop && <Overlay color="green"/>}
        </div>
    )
}
