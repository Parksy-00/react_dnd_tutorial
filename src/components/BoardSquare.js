import React from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../Constants';
import { moveBishop } from '../state/BishopSlice';
import { moveKnight } from '../state/KnightSlice';
import { moveRook } from '../state/RookSlice';
import Square from './Square'
import Overlay from './Overlay';

export default function BoardSquare({x, y, isFull, children}) {
    const black = (x + y) % 2 === 1;
    const dispatch = useDispatch();
    const knightPos = useSelector((state) => state.knight);
    const bishopPos = useSelector((state) => state.bishop);
    const rookPos = useSelector((state) => state.rook);


    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: [ItemTypes.KNIGHT, ItemTypes.BISHOP, ItemTypes.ROOK],
            drop: (item, monitor) => {
                const type = monitor.getItemType();
                if (type === ItemTypes.KNIGHT) {
                    dispatch(moveKnight({x, y}))
                }
                if (type === ItemTypes.BISHOP) {
                    dispatch(moveBishop({x, y}))
                }
                if (type === ItemTypes.ROOK) {
                    dispatch(moveRook({x, y}))
                }
            },
            canDrop: (item, monitor) => {
                const type = monitor.getItemType();
                if (type === ItemTypes.BISHOP) {
                    return canMoveBishop(bishopPos, x, y);
                }
                if (type === ItemTypes.KNIGHT) {
                    return canMoveKnight(knightPos, x, y);
                }
                if (type === ItemTypes.ROOK) {
                    return canMoveRook(rookPos, x, y);
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            })
        }),
        [x, y, knightPos, bishopPos, rookPos]
    )

    function canMoveKnight(knightPos, toX, toY) {
        const { knightX, knightY } = knightPos;
        const dx = toX - knightX;
        const dy = toY - knightY;
    
        return (
            !isFull &&
            ((Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2))
        )
    }

    function canMoveBishop(BishopPos, toX, toY) {
        const { bishopX, bishopY } = BishopPos;
        const dx = toX - bishopX;
        const dy = toY - bishopY;

        return (
            !isFull &&
            Math.abs(dx) === Math.abs(dy)
        );
    }

    function canMoveRook(rookPos, toX, toY) {
        const { rookX, rookY } = rookPos;
        const dx = toX - rookX;
        const dy = toY - rookY;

        return (
            !isFull &&
            (dx === 0 || dy === 0)
        );
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
