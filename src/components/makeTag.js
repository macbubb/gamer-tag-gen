import { adjs, nouns } from '../Constants';

const makeTag = (cardInventory, setCardInventory) => {
  const maxTagLength = 15;
  var timeStamp = Date.now();
  const emptyInventory = cardInventory.length === 1 ? true : false;
  //pick adj and noun
  //check if adj or noun is used in any tagID
  //if not used, return adj and noun index
  //if yes, half the time return a new adj, half the time return the repeated part
  const pickTagID = () => {
    var returnID = [
      Math.floor(Math.random() * adjs.length),
      Math.floor(Math.random() * nouns.length),
    ];
    emptyInventory === false
      ? cardInventory.map((card) => {
          if (card.tagID[0] === returnID[0]) {
            if (Math.random() > 0.5) {
              randomAdjIndex = Math.floor(Math.random() * adjs.length);
            }
          }
          if (card.tagID[1] === returnID[1]) {
            if (Math.random() > 0.5) {
              randomNounIndex = Math.floor(Math.random() * nouns.length);
            }
          }
          return randomNounIndex;
        })
      : console.log('new inventory');
    return returnID;
  };

  var [randomAdjIndex, randomNounIndex] = pickTagID();

  var newAdj = adjs[randomAdjIndex];
  var newNoun = nouns[randomNounIndex];

  while (newAdj.length + newNoun.length > maxTagLength) {
    [randomAdjIndex, randomNounIndex] = pickTagID();
    newAdj = adjs[randomAdjIndex];
    newNoun = nouns[randomNounIndex];
  }

  const roughDraftTag = newAdj + newNoun;

  const finalNewTag = {
    timeStamp: timeStamp,
    tag: roughDraftTag,
    stars: 0,
    tagID: [randomAdjIndex, randomNounIndex],
  };
  //just return the finalNewTag
  return finalNewTag;
};

export default makeTag;
