import { chopDecimal } from './Helpers.js';

const makeFrameOffset = () => {
  const variability = 10; //how many px box corners can shift
  return [
    [
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
    ],
    [
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
    ],
    [
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
    ],
    [
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
      chopDecimal(2 * (Math.random() - 0.5) * variability, 2),
    ],
  ];
};

export default makeFrameOffset;
