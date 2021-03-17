import React, { useState } from "react";
import SplatterOne from "./SplatterOne";

function SplatterBox() {
	//how big is our rectangle?
	// rectangle width
	// rectangle height
	const rectW = 100; //px
	const rectH = 61; //px
	//how many splatters
	const splatCount = getRandomIntInclusive(3, 6);

	//for each splatter:
	//      SVG
	const splatterChoice = getRandomIntInclusive(1, 1); //will increase after testing
	//      size .5 - 1.2
	const scale = getRandomFloat(0.5, 1.2);
	//      rotation full 360
	const rotation = getRandomIntInclusive(0, 360);
	//      x transform
	const xTrans = (Math.random() - 1) * rectW;
	//      y transform
	const yTrans = (Math.random() - 1) * rectH;
	//      Droplet
	//          x transform
	const dropXTrans = xTrans * 0.1;
	//          y transform
	const dropYTrans = yTrans * 0.1;
	//          inherit size

	const x = 100;
	const y = 100;

    const matrixProps = "matrix(" + scale + ", 0, 0, " + scale +' ,' + xTrans +',' + yTrans + ')';

    const dropStyles = {
		transform: matrixProps
	};
    console.log({xTrans},{dropStyles});

    return (
		<div >
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