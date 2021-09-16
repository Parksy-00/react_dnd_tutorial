import React from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../Constants';
import { moveKnight } from '../state/knightSlice';
import Square from './Square'

function Overlay({color}) {
    return (
        <div style={{
            position: 'absolute',
            top:0.5,
            left:0.5,
            height:'100%',
            width:'100%',
            zIndex:1,
            opacity:0.5,
            backgroundColor: color
        }}/>
    )
}



export default function BoardSquare({x, y, children}) {
    const black = (x + y) % 2 === 1;
    const dispatch = useDispatch();
    const knightPos = useSelector((state) => state.knight);


    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.KNIGHT,
            drop: () => dispatch(moveKnight({x, y})),
            canDrop: () => canMoveKnight(knightPos, x, y),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [x, y, knightPos]
    )

    function canMoveKnight(knightPos, toX, toY) {
        const { knightX, knightY } = knightPos;
        const dx = toX - knightX;
        const dy = toY - knightY;
    
        return (
            (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2)
        )
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
            {/* {!isOver && canDrop && <Overlay color="yellow"/>} */}
            {isOver && canDrop && <Overlay color="green"/>}
        </div>
    )
}
