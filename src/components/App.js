import React, { useState, useEffect} from 'react';
import { adjs, nouns, reviewAdjs, reviewNouns} from '../Constants';
import '../App.css';
import Card from './Card';
import UserForm from './UserForm';
import {getRandomFloat, getRandomIntInclusive, getRandomSign} from './Helpers.js';

function App() {
  const [cardInventory, setCardInventory] = useState([{
    timeStamp: '',
    tag:'firstCard',
    stars:0,
    color:'146fffff',
    splatters: [],
    frameOffset: []
  }]);

  const cardDimensions = {
    rectH : 100, //248
    rectW : 200,
    originOffset: [10,10]
  }

  const handleAdd = (card) => {
    setCardInventory([ card, ...cardInventory ]);
  }

  const [options, setOptions] = useState({opts: 'bothCaps', addNum: false, numDigitCount:'', maxLength: 20});

  const makeCard = () => {
    const cardTag = makeTag();
    const cardSplatters = makeSplatters();
    const cardFrameOffset = makeFrame();
    const newCard = {...cardTag,
                    splatters: cardSplatters,
                    frameOffset: cardFrameOffset}
    //add card to state
    handleAdd(newCard);
  }

  const makeSplatters = () => {
    const newSplatters = [{},{},{},{},{},{},{},{}];
    const {rectH, rectW} = cardDimensions;
    //small splats
    for (let i=0; i<5; i++) {
      newSplatters[i].splatterNum = getRandomIntInclusive(1, 7);
      newSplatters[i].skewX = getRandomIntInclusive(-20, 20);
      newSplatters[i].scale = getRandomFloat(0.5, 1.2);
      newSplatters[i].skewY = getRandomIntInclusive(-20, 20);
      newSplatters[i].rotation = getRandomIntInclusive(0, 360);
      newSplatters[i].xTrans = (rectW / 3) * getRandomSign();//  + 20 * (Math.random() - 1/2);
      newSplatters[i].yTrans = (rectH / 3) * getRandomSign();//  + 5 * (Math.random() - 1/2);
    }
    //big splats
    for (let i=5; i<8; i++) {
      newSplatters[i].splatterNum = getRandomIntInclusive(8, 12);
      newSplatters[i].skewX = getRandomIntInclusive(-50, 50);
      newSplatters[i].scale = getRandomFloat(1, 1.5);
      newSplatters[i].skewY = getRandomIntInclusive(-20, 20);
      newSplatters[i].rotation = getRandomIntInclusive(0, 360);
      newSplatters[i].xTrans = .3 * (Math.random() - 1) * rectW;
      newSplatters[i].yTrans = .2 * (Math.random() - 1) * rectH;
    }
    return newSplatters;
  }

  const makeTag = () => {
    const randomAdjIndex = Math.floor(Math.random()*adjs.length);
    const randomNounIndex = Math.floor(Math.random()*nouns.length);
    const newTagOpts = options.opts;
    var timeStamp = Date.now();
    var roughDraftTag = 'abcdefghijklmnopqrstuvwxyzabcd';
    var newAdj = adjs[randomAdjIndex];
    var newNoun = nouns[randomNounIndex];
    // bothCaps leave noun and adj alone
    // frontCap make noun lower case
    // allCaps make noun and adj uppercase
    while(roughDraftTag.length > options.maxLength) {
      switch(newTagOpts) {
        case "frontCap":
          roughDraftTag = newAdj + newNoun.toLowerCase();
          break;
        case "allCaps":
          roughDraftTag = newAdj.toUpperCase() + newNoun.toUpperCase();
          break;
        default:
          roughDraftTag = newAdj + newNoun;
      }
    }

    const finalNewTag = {
      timeStamp: timeStamp,
      tag : roughDraftTag,
      stars : 0,
      color : '#ffffff',
    };
    //just return the finalNewTag
    return finalNewTag;
  }

  const makeFrame = () => {
    const variability = 10; //how many px box corners can shift
    return ([
            [(2*(Math.random()-.5))*variability, (2*(Math.random()-.5))*variability],
            [(2*(Math.random()-.5))*variability, (2*(Math.random()-.5))*variability,],
            [(2*(Math.random()-.5))*variability, (2*(Math.random()-.5))*variability,],
            [(2*(Math.random()-.5))*variability, (2*(Math.random()-.5))*variability,]
          ]);
  };

  function changeStars(stars, key) {
    const newRatingInventory = cardInventory.map(obj => obj.timeStamp === key ? { ...obj, stars } : obj);

    setCardInventory(newRatingInventory);
  }
//filter through cards
  function deleteCard(key) {
    // use filter to make a copy without tag that's been deleted
    const newRatingInventory = cardInventory.filter(obj => obj.timeStamp !== key);
    setCardInventory(newRatingInventory);
  }

  useEffect( () => {
      makeCard();
    },
      [options]);

  const onFormUpdate = values => {
    const newOptions = {opts: values.opts, addNum: values.addNum, numDigitCount: values.numDigitCount, maxLength: 20};
    setOptions(newOptions);
  };

  useEffect(() => {
    reviewAdjs();
    reviewNouns();
  }, []); //passing empty array as dependency triggers effect on first load only, as it does not have a dependency

  const sortCards = () => {
    let sortedInventory = [];
    for (let i = 5; i >= 0; i--) {
      sortedInventory = cardInventory.filter(card => card.stars === i).length !==0 ?
      [...sortedInventory, ...cardInventory.filter(card => card.stars === i)] :
      [...sortedInventory];
    }
    sortedInventory = [...sortedInventory.filter(card => card.tag === 'firstCard'), ...sortedInventory.filter(card => card.tag !== 'firstCard')]; //move empty card to front
    setCardInventory(sortedInventory);
  }

  return (
    <main>
      <div className="main-heading">
        <h1>Gamertag Brain Tsunami</h1>
      </div>
      <div className="main-display">
        <div className="main-display-left">
          <div className="main-display-left-display">
            {cardInventory[0].tag !== 'firstCard' ?
              <Card /* need to switch to card */
                cardScale={2}
                cardDimensions={cardDimensions}
                card={cardInventory[0]}
                changeStars={changeStars}
                newTag={true}
                deleteCard={deleteCard}
                key={cardInventory[0].timeStamp}
              />
                :
                <div className="card new-card">
                  <div className="card-graphics">
                    <div className="card-splatters"></div>
                    <div className="card-frame"></div>
                  </div>
                  <div className="card-info"></div>
                </div>}
            <div className="main-display-left-controls">
              <UserForm
                options={options}
                onUpdate={onFormUpdate}
              />
            </div>
          </div>

        </div>
        <div className="main-display-right">
          <h2>Inventory</h2>
          <div className="main-display-right-controls">
            <button
              className="sort-cards"
              type="button"
              onClick={() => sortCards()}>
                Sort Cards </button>
          </div>
          <section className="card-inventory">
            {/* Need inventory to not display empty firstCard, which is used to initialize state and provide a blank space in the left/large display. Procedure 1) check if a second card exists 2) filter out the firstCard 3) map and display the remaining cards */}
            {cardInventory[1] ? cardInventory.filter( card => card.tag !== 'firstCard').map( (item) =>
              <Card
                cardScale={1}
                cardDimensions={cardDimensions}
                key={item.timeStamp}
                card={item}
                changeStars={changeStars}
                deleteCard={deleteCard}
              />
              ) : ''}
          </section>
        </div>
      </div>
    </main>
  );

};

export default App;
