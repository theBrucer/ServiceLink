import React from 'react'

const BodyTitle = (props) => {

    let h1Style = {
        fontWeight: "bold",
        fontSize: props.fontSize ? props.fontSize : "40px",
        color: "#7F8E9F"
    }

    return (
        <h1 style={h1Style} className={props.className}>{props.title}</h1>
    )
}

export default BodyTitle;