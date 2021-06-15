import {
  getRandomFloat,
  getRandomIntInclusive,
  getRandomSign,
  chopDecimal,
} from './Helpers.js';

const makeSplatters = (cardDimensions) => {
  const newSplatters = [{}, {}, {}, {}, {}, {}, {}, {}];
  const rainbowColors = ['#BF3064', '#A545BF', '#025373', '#F29D35', '#F2784B'];
  const { rectH, rectW } = cardDimensions;
  //small splats
  for (let i = 0; i < 5; i++) {
    newSplatters[i].rainbowColorChoice =
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    newSplatters[i].splatterNum = getRandomIntInclusive(1, 7);
    newSplatters[i].skewX = getRandomIntInclusive(-20, 20);
    newSplatters[i].scale = getRandomFloat(1.2, 1.5);
    newSplatters[i].skewY = getRandomIntInclusive(-20, 20);
    newSplatters[i].rotation = getRandomIntInclusive(0, 360);
    newSplatters[i].xTrans = chopDecimal((rectW / 3) * getRandomSign(), 2);
    newSplatters[i].yTrans = chopDecimal((rectH / 3) * getRandomSign(), 2);
    newSplatters[i].key = i; //safe to use index as key as each list are static, have no ids, and will never be reordered
  }
  //big splats
  for (let i = 5; i < 8; i++) {
    newSplatters[i].rainbowColorChoice =
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    newSplatters[i].splatterNum = getRandomIntInclusive(8, 12);
    newSplatters[i].skewX = getRandomIntInclusive(-50, 50);
    newSplatters[i].scale = chopDecimal(getRandomFloat(1, 1.5), 2);
    newSplatters[i].skewY = getRandomIntInclusive(-20, 20);
    newSplatters[i].rotation = getRandomIntInclusive(0, 360);
    newSplatters[i].xTrans = chopDecimal(0.3 * (Math.random() - 1) * rectW, 2);
    newSplatters[i].yTrans = chopDecimal(0.2 * (Math.random() - 1) * rectH, 2);
    newSplatters[i].key = i;
  }
  return newSplatters;
};

export default makeSplatters;
