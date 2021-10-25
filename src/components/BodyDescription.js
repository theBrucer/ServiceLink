import React from 'react';

const BodyDescription = ({ description }) => {

    let descriptionStyle = {
        color: "rgb(127, 142, 159)"
    }

    return (
        <div style={descriptionStyle} className="mb-4">{description}</div>
    )
}

export default BodyDescription;