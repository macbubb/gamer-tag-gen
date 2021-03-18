import React from 'react';
import SplatterOne from "./Splatters/SplatterOne";
import SplatterTwo from "./Splatters/SplatterTwo";
import SplatterThree from "./Splatters/SplatterThree";
import SplatterFour from "./Splatters/SplatterFour";
import SplatterFive from "./Splatters/SplatterFive";
import SplatterSix from "./Splatters/SplatterSix";
import SplatterSeven from "./Splatters/SplatterSeven";
import SplatterEight from "./Splatters/SplatterEight";
import SplatterNine from "./Splatters/SplatterNine";
import SplatterTen from "./Splatters/SplatterTen";
import SplatterEleven from "./Splatters/SplatterEleven";
import SplatterTwelve from "./Splatters/SplatterTwelve";

function RenderSplatters(props) {
    const {splatterNum, skewX, skewY, scale, rotation, xTrans, yTrans} = props.splatter;
    const cardScale = props.cardScale;

    const dropStyles = {
        transform: 'scale(' + scale * cardScale + ') skew(' + skewX * cardScale + 'deg, ' + skewY * cardScale + 'deg) rotate(' + rotation * cardScale + 'deg) translateX(' + xTrans * cardScale + 'px) translateY(' + yTrans * cardScale + 'px)'
      };
    console.log(dropStyles);
    switch(splatterNum) {
        case 1:
            return <SplatterOne stylez={dropStyles} />
        case 2:
            return <SplatterTwo stylez={dropStyles} />
        case 3:
            return <SplatterThree stylez={dropStyles} />
        case 4:
            return <SplatterFour stylez={dropStyles} />
        case 5:
            return <SplatterFive stylez={dropStyles} />
        case 6:
            return <SplatterSix stylez={dropStyles} />
        case 7:
            return <SplatterSeven stylez={dropStyles} />
        case 8:
            return <SplatterEight stylez={dropStyles} />
        case 9:
            return <SplatterNine stylez={dropStyles} />
        case 10:
            return <SplatterTen stylez={dropStyles} />
        case 11:
            return <SplatterEleven stylez={dropStyles} />
        case 12:
            return <SplatterTwelve stylez={dropStyles} />
    }
}

export default RenderSplatters;