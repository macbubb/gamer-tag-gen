import React, { useState } from "react";
import SplatterOne from "./SplatterOne";

    // move transforming attributes to separate function that will store splatters in state
    // this function will render all of the splatters including scale
function SplatterBox() {
	//based on golden ratio, not sure where to include this yet
    const rectW = 100; //px
	const rectH = 61; //px

	//for each splatter:
	//      SVG
	//      size .5 - 1.2
	const scale = getRandomFloat(0.5, 1.2);
    const skewX = getRandomIntInclusive(-50, 50);
    const skewY = getRandomIntInclusive(-50, 50);
	const rotation = getRandomIntInclusive(0, 360);
	const xTrans = (Math.random() - 1) * rectW;
	const yTrans = (Math.random() - 1) * rectH;

    /*
	//      Droplet may implement a droplet animation
	//          x transform
    const dropXTrans = xTrans * 0.1;
	//          y transform
	const dropYTrans = yTrans * 0.1;
	//          inherit size
    */

	const dropStyles = {
		transform: 'scale(' + scale + ') skew(' + skewX + 'deg, ' + skewY + 'deg) rotate(' + rotation + 'deg) translateX(' + xTrans + 'px) translateY(' + yTrans + 'px)'
	};
    console.log(dropStyles);

    return (
		<div>
            <SplatterOne stylez={dropStyles}/>

		</div>
	);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

export default SplatterBox;