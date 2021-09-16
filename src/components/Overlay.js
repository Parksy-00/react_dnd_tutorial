export default function Overlay({color}) {
    return (
        <div style={{
            position: 'absolute',
            top:0,
            left:0,
            height:'102%',
            width:'102%',
            zIndex:1,
            opacity:0.6,
            backgroundColor: color
        }}/>
    )
}