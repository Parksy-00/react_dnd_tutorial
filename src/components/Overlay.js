export default function Overlay({color}) {
    return (
        <div style={{
            position: 'absolute',
            top:0,
            left:0,
            height:'calc(100% + 1px)',
            width:'calc(100% + 1px)',
            zIndex:1,
            opacity:0.55,
            backgroundColor: color
        }}/>
    )
}