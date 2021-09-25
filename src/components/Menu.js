import React from 'react'
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Rook from './pieces/Rook';
import Queen from './pieces/Queen';
import King from './pieces/King';
import Pawn from './pieces/Pawn';

export default function Menu() {
    return (
        <div style={{width: '800px', height: '800px'}}>
            <div style={{marginTop: '50%', display:'flex', justifyContent:'center'}}>
                <Knight id={-1} />
                <Bishop id={-1} />
                <Rook id={-1}/>
                <Queen id={-1}/>
                <Pawn id={-1}/>
                <King id={-1}/>
            </div>
        </div>
    )
}
