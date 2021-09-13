import React from 'react'
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../Constants';
import { canMoveKnight, moveKnight } from '../Game';
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
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.KNIGHT,
            drop: () => moveKnight(x, y),
            canDrop: () => canMoveKnight(x, y),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [x, y]
    )
    
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
