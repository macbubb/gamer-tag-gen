const sortCards = (cardInventory, setCardInventory) => {
  let sortedInventory = [];
  for (let i = 5; i >= 0; i--) {
    sortedInventory =
      cardInventory.filter((card) => card.stars === i).length !== 0
        ? [
            ...sortedInventory,
            ...cardInventory.filter((card) => card.stars === i),
          ]
        : [...sortedInventory];
  }
  sortedInventory = [
    ...sortedInventory.filter((card) => card.tag === 'firstCard'),
    ...sortedInventory.filter((card) => card.tag !== 'firstCard'),
  ]; //move empty card to front
  setCardInventory(sortedInventory);
};

export default sortCards;
