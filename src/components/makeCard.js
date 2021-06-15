import makeSplatters from './makeSplatters';
import makeTag from './makeTag';
import makeFrameOffset from './makeFrameOffset';

const makeCard = (cardInventory, setCardInventory, cardDimensions) => {
  //create tag, splatters, frame corner offset for each card
  const cardTag = makeTag(cardInventory, setCardInventory);
  const cardSplatters = makeSplatters(cardDimensions);
  const cardFrameOffset = makeFrameOffset();
  //spread operator for cardTag as it is not an object within the card, splatters and frameOffset are stored as nested objects in a property
  const newCard = {
    ...cardTag,
    splatters: cardSplatters,
    frameOffset: cardFrameOffset,
  };
  //add card to state
  handleAdd(newCard, cardInventory, setCardInventory);
};

const handleAdd = (card, cardInventory, setCardInventory) => {
  setCardInventory([card, ...cardInventory]);
};

export default makeCard;
