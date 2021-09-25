import React from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../Constants';
import { movePiece, addPiece } from '../state/PieceSlice';
import { create, move } from '../state/BoardSlice'
import Square from './Square'
import Overlay from './Overlay';

export default function BoardSquare({x, y, isEmpty, children}) {
    const black = (x + y) % 2 === 1;
    const dispatch = useDispatch();
    const pieces = useSelector((state) => state.pieces);
    const board = useSelector((state) => state.board);

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: [...Object.values(ItemTypes)],
            drop: (item, monitor) => {
                const {id, type} = item;
                if (id === -1) {
                    const keys = Object.keys(pieces);
                    const newId = keys.length === 0 ? 1 : (Number(keys[keys.length - 1]) + 1);
                    dispatch(create({id: newId, type, x, y}));
                    dispatch(addPiece({type, x, y}));
                    return;
                }
                const piece = pieces[id];
                dispatch(movePiece({id, x, y}));
                dispatch(move({id, type, x: piece.x, y: piece.y, toX: x, toY: y}));
            },
            canDrop: (item, monitor) => {
                const id = item.id
                if (id === -1) {
                    return canCreate(x, y);
                }
                return canMove(pieces[id], x, y);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            })
        }),
        [pieces, board]
    )

    function canCreate(x, y) {
        return board[y][x].id === -1;
    }

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
            case 'pawn': {
                return isEmpty &&
                (dx === 0 && (piece.y === 6 ? dy === -1 || dy === -2 : dy === -1))
            }
            case 'queen': {
                return isEmpty &&
                (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy));
            }
            case 'king': {
                return isEmpty &&
                Math.abs(dx) <= 1 && Math.abs(dy) <= 1
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
