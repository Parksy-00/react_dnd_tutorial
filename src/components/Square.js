import React from 'react'

export default function Square({black, children}) {
    const color = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';
    
    return (
        <div style={{backgroundColor: color, width:'100px', height: '100px', border:'1px solid #d9d9d9', color:stroke, display:'flex', justifyContent:'center', alignItems:'center'}}>
            {children}
        </div>
    )
}
