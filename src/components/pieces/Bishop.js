import React from 'react'
import { ItemTypes } from '../../Constants'
import { useDrag } from 'react-dnd'


export default function Bishop({id}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BISHOP,
        item: {id, type:'bishop'},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    
    return (
        <div
            ref={drag}
            style={{fontSize:50, opacity: isDragging? 0.5 : 1, cursor: 'pointer', width:60, height:60, fontWeight:'bold'}}
        >
            ♗
        </div>
    )
}