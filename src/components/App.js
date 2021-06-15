import React, { useState, useEffect } from 'react';
import { reviewConstants } from '../Constants';
import useKeyboardShortcut from './useKeyboardShortcut';
import '../App.css';
import Card from './Card';
import ColorSwitch from './ColorSwitch';
import Welcome from './Welcome';
import makeCard from './makeCard';
import sortCards from './sortCards';

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
      tagID: [null, null],
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

  useKeyboardShortcut(
    ['Enter'],
    () => makeCard(cardInventory, setCardInventory, cardDimensions),
    { overrideSystem: false }
  );

  useKeyboardShortcut(['H'], () => togglePopup(!welcomeState.showPopup), {
    overrideSystem: false,
  });

  useKeyboardShortcut(['S'], () => sortCards(cardInventory, setCardInventory), {
    overrideSystem: false,
  });

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
              <div className="card latest">
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
                  onClick={() =>
                    makeCard(cardInventory, setCardInventory, cardDimensions)
                  }
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
              onClick={() => sortCards(cardInventory, setCardInventory)}
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
