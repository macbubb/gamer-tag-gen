import React from 'react';

function RenderCardFrame(props) {
    const {topLeft, topRight, bottomRight, bottomLeft} = props.frameCorners;
    const frameCorners =
        topLeft[0] + "," + topLeft[1] + " " +
        topRight[0] + "," + topRight[1] + " " +
        bottomRight[0] + "," + bottomRight[1] + " " +
        bottomLeft[0] + "," + bottomLeft[1];
    const frameStyle = {
        fill: 'grey',
        stroke: 'black',
        position: 'relative'
        //stroke-width: '1'
    };
    const svgW = 350 * props.cardScale;
    const svgH = 225 * props.cardScale;

    const svgSize = {
        width: svgW + 'px',
        height: svgH + 'px'
    };

    return(
    <svg style={svgSize}>
        <polygon fill-opacity=".7" points={frameCorners} style={frameStyle} />
        Sorry, your browser does not support inline SVG.
    </svg>
  );
}

export default RenderCardFrame;