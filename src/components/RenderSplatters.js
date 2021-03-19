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
    // {splatterNum, skewX, skewY, scale, rotation, xTrans, yTrans} = props.splatter;
    const cardScale = props.cardScale;
    const splatterNum = props.splatter.splatterNum;
    const scale = props.splatter.scale * cardScale;
    const skewX = props.splatter.skewX;
    const skewY = props.splatter.skewY;
    const rotation = props.splatter.rotation;
    const xTrans = props.splatter.xTrans * cardScale;
    const yTrans = props.splatter.yTrans * cardScale;

    const splatStyles = {
        transform: 'scale(' + scale + ') skew(' + skewX  + 'deg, ' + skewY + 'deg) rotate(' + rotation + 'deg) translateX(' + xTrans + 'px) translateY(' + yTrans + 'px)'
      };
    function PickSplatter() {
        switch(splatterNum) {
            case 1:
                return <SplatterOne stylez={splatStyles} />
            case 2:
                return <SplatterTwo stylez={splatStyles} />
            case 3:
                return <SplatterThree stylez={splatStyles} />
            case 4:
                return <SplatterFour stylez={splatStyles} />
            case 5:
                return <SplatterFive stylez={splatStyles} />
            case 6:
                return <SplatterSix stylez={splatStyles} />
            case 7:
                return <SplatterSeven stylez={splatStyles} />
            case 8:
                return <SplatterEight stylez={splatStyles} />
            case 9:
                return <SplatterNine stylez={splatStyles} />
            case 10:
                return <SplatterTen stylez={splatStyles} />
            case 11:
                return <SplatterEleven stylez={splatStyles} />
            case 12:
                return <SplatterTwelve stylez={splatStyles} />
            default:
                return <SplatterOne stylez={splatStyles} />
        }
    }
    return (<PickSplatter/>);
}

export default RenderSplatters;