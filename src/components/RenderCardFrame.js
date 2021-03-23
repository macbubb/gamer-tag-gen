import React from 'react';

function RenderCardFrame(props) {
    const {topLeft, topRight, bottomRight, bottomLeft} = props.frameCorners;
    const frameCorners =
        topLeft[0] + "," + topLeft[1] + " " +
        topRight[0] + "," + topRight[1] + " " +
        bottomRight[0] + "," + bottomRight[1] + " " +
        bottomLeft[0] + "," + bottomLeft[1];
    const frameStyle = {
        fill: 'white',
        stroke: 'black'
        //stroke-width: '1'
    };


    return(
    <svg height="250" width="500">
        <polygon points={frameCorners} style={frameStyle} />
        Sorry, your browser does not support inline SVG.
    </svg>
  );
}

export default RenderCardFrame;