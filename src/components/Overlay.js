export default function Overlay({color}) {
    return (
        <div style={{
            position: 'absolute',
            top:0,
            left:0,
            height:'101%',
            width:'101%',
            zIndex:1,
            opacity:0.5,
            backgroundColor: color
        }}/>
    )
}