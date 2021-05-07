import React, { useState, useEffect } from 'react';
import { adjs, nouns, reviewConstants } from '../Constants';
import useKeyboardShortcut from './useKeyboardShortcut';
import '../App.css';
import Card from './Card';
import {
  getRandomFloat,
  getRandomIntInclusive,
  getRandomSign,
  chopDecimal,
} from './Helpers.js';
import ColorSwitch from './ColorSwitch';
import Welcome from './Welcome';

function App() {
  /*
splatters contains the svg splatter number and random transforms
frameOffset contains how each corner is transformed (X,Y) which is used to calculate the corners depending on the scale by Card and drawn by RenderCardFrame
*/

  const [cardInventory, setCardInventory] = useState([
    {
      timeStamp: '',
      tag: 'firstCard',
      stars: 0,
      splatters: [],
      frameOffset: [],
    },
  ]);

  //1 for black 2 for red 3 for rainbow
  const [colorPalette, setColorPalette] = useState(1);

  const [welcomeState, setWelcomeState] = useState({ showPopup: true });

  const cardDimensions = {
    rectH: 100, //248
    rectW: 200,
    originOffset: [10, 10],
  };

  const handleAdd = (card) => {
    setCardInventory([card, ...cardInventory]);
  };

  const makeCard = () => {
    //create tag, splatters, frame corner offset for each card
    const cardTag = makeTag();
    const cardSplatters = makeSplatters();
    const cardFrameOffset = makeFrameOffset();
    //spread operator for cardTag as it is not an object within the card, splatters and frameOffset are stored as nested objects in a property
    const newCard = {
      ...cardTag,
      splatters: cardSplatters,
      frameOffset: cardFrameOffset,
    };
    //add card to state
    handleAdd(newCard);
  };

  const makeSplatters = () => {
    const newSplatters = [{}, {}, {}, {}, {}, {}, {}, {}];
    const rainbowColors = [
      '#BF3064',
      '#A545BF',
      '#025373',
      '#F29D35',
      '#F2784B',
    ];
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
      newSplatters[i].xTrans = chopDecimal(
        0.3 * (Math.random() - 1) * rectW,
        2
      );
      newSplatters[i].yTrans = chopDecimal(
        0.2 * (Math.random() - 1) * rectH,
        2
      );
      newSplatters[i].key = i;
    }
    return newSplatters;
  };

  const makeTag = () => {
    const maxTagLength = 15;
    var randomAdjIndex = Math.floor(Math.random() * adjs.length);
    var randomNounIndex = Math.floor(Math.random() * nouns.length);
    var timeStamp = Date.now();
    var newAdj = adjs[randomAdjIndex];
    var newNoun = nouns[randomNounIndex];
    var roughDraftTag = newAdj + newNoun;

    while (newAdj.length + newNoun.length > maxTagLength) {
      randomAdjIndex = Math.floor(Math.random() * adjs.length);
      randomNounIndex = Math.floor(Math.random() * nouns.length);
      newAdj = adjs[randomAdjIndex];
      newNoun = nouns[randomNounIndex];
    }

    roughDraftTag = newAdj + newNoun;

    const finalNewTag = {
      timeStamp: timeStamp,
      tag: roughDraftTag,
      stars: 0,
    };
    //just return the finalNewTag
    return finalNewTag;
  };

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

  function changeStars(stars, key) {
    const newRatingInventory = cardInventory.map((obj) =>
      obj.timeStamp === key ? { ...obj, stars } : obj
    );

    setCardInventory(newRatingInventory);
  }
  //filter through cards
  function deleteCard(key) {
    // use filter to make a copy without tag that's been deleted
    const newRatingInventory = cardInventory.filter(
      (obj) => obj.timeStamp !== key
    );
    setCardInventory(newRatingInventory);
  }

  useEffect(() => {
    reviewConstants();
  }, []); //passing empty array as dependency triggers effect on first load only, as it does not have a dependency

  const sortCards = () => {
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

  const handleSwitchChange = (newColor) => {
    setColorPalette(newColor);
  };

  const togglePopup = (newPopupState) => {
    const newWelcomeState = { showPopup: newPopupState };
    setWelcomeState(newWelcomeState);
  };

  useKeyboardShortcut(
    ['Shift', 'H'],
    () => console.log('Shift + H has been pressed.'),
    { overrideSystem: false }
  );

  useKeyboardShortcut(['Enter'], () => makeCard(), { overrideSystem: false });

  useKeyboardShortcut(['H'], () => togglePopup(!welcomeState.showPopup), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['S'], () => sortCards(), { overrideSystem: false });

  useKeyboardShortcut(['1'], () => changeStars(1, cardInventory[0].timeStamp), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['2'], () => changeStars(2, cardInventory[0].timeStamp), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['3'], () => changeStars(3, cardInventory[0].timeStamp), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['4'], () => changeStars(4, cardInventory[0].timeStamp), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['5'], () => changeStars(5, cardInventory[0].timeStamp), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['Escape'], () => togglePopup(false), {
    overrideSystem: false,
  });

  /*   const keyMap = {
    makeCard: 'enter',
    rateOne: '1',
    rateTwo: '2',
    rateThree: '3',
    rateFour: '4',
    rateFive: '5',
    help: 'h',
    sort: 's',
  };

  const handlers = {
    makeCard: (event) => makeCard(),
    rateOne: () => changeStars(1, cardInventory[0].timeStamp),
    rateTwo: () => changeStars(2, cardInventory[0].timeStamp),
    rateThree: () => changeStars(3, cardInventory[0].timeStamp),
    rateFour: () => changeStars(4, cardInventory[0].timeStamp),
    rateFive: () => changeStars(5, cardInventory[0].timeStamp),
    help: () => togglePopup(true),
  }; */

  return (
    <main>
      <Welcome
        welcomeState={welcomeState.showPopup}
        togglePopup={togglePopup}
      />
      <div className="main-heading">
        <h1>Gamertag Brain Tsunami</h1>
      </div>
      {/*       <HotKeys keyMap={keyMap} handlers={handlers}>
       */}{' '}
      <div className="main-display">
        <div className="main-display-left">
          <div className="main-display-left-display">
            {cardInventory[0].tag !== 'firstCard' ? (
              <Card
                cardScale={2}
                palette={colorPalette}
                cardType={'latest'}
                cardDimensions={cardDimensions}
                card={cardInventory[0]}
                changeStars={changeStars}
                newTag={true}
                deleteCard={deleteCard}
              />
            ) : (
              <div className="card new-card">
                <div className="card-graphics">
                  <div className="card-splatters"></div>
                  <div className="card-frame"></div>
                </div>
                <div className="card-info"></div>
              </div>
            )}
            <div className="main-display-left-controls">
              <div className="main-display-left-controls-button">
                <button
                  className="generate-card"
                  aria-label="Generate New Gamertag"
                  type="submit"
                  onClick={() => makeCard()}
                >
                  Create
                </button>
              </div>
              <div className="color-switch">
                <ColorSwitch
                  palette={colorPalette}
                  handleSwitchChange={handleSwitchChange}
                />
              </div>
              <div className="help-button">
                <button
                  type="button"
                  className="help"
                  onClick={() => togglePopup(true)}
                >
                  help
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="main-display-right">
          <h2>Inventory</h2>
          <div className="main-display-right-controls">
            <button
              className="sort-cards"
              type="button"
              onClick={() => sortCards()}
            >
              Sort Cards
            </button>
          </div>
          <section className="card-inventory">
            {cardInventory[1]
              ? cardInventory
                  .filter((card) => card.tag !== 'firstCard')
                  .map((card) => (
                    <Card
                      cardScale={1}
                      cardType={'inventory'}
                      palette={colorPalette}
                      cardDimensions={cardDimensions}
                      key={card.timeStamp}
                      card={card}
                      changeStars={changeStars}
                      deleteCard={deleteCard}
                    />
                  ))
              : ''}
          </section>
        </div>
      </div>
      {/*       </HotKeys>
       */}{' '}
    </main>
  );
}

export default App;
