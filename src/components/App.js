import React, { useState, useEffect, useRef } from 'react';
import { adjs, nouns } from '../Constants';
import '../App.css';
import Card from './Card';
import UserForm from './UserForm';

function App() {
  //this will be cardInventory
  const [cardInventory, setCardInventory] = useState([{
    timeStamp: '',
    tag:'',
    stars:0,
    color:'#fffff',
    splatters: [],
  }]);

  //Card size
  const rectW = 100;
  const rectH = 61;

  //add these to a helper file
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  // keeps track of most recent tag, and is null if no tag has been generated, used to conditionally render the top tag, without testing it can't get called
  // consider starting the program with a loaded tag need to change to card
  const latestTag = cardInventory[cardInventory.length - 1] ? cardInventory[cardInventory.length -1] : null;

  //will use card instead
  const handleAdd = (card) => {
    setCardInventory([ card, ...cardInventory ]);
  }

  const [options, setOptions] = useState({opts: 'bothCaps', addNum: false, numDigitCount:'', maxLength: 20});

  const makeCard = () => {
    //make Tag
    const cardTag = makeTag();
    const cardSplatters = makeSplatters()
    const newCard = {... cardTag, splatters: cardSplatters}
    //add card to state
    handleAdd(newCard);
  }

  const makeSplatters = () => {
    const newSplatters = [{},{},{},{},{},{},{},{}];
    //small splats
    for (let i=0; i<5; i++) {
      newSplatters[i].splatterNum = getRandomIntInclusive(1, 7);
      newSplatters[i].skewX = getRandomIntInclusive(-50, 50);
      newSplatters[i].scale = getRandomFloat(0.5, 1.2);
      newSplatters[i].skewY = getRandomIntInclusive(-50, 50);
      newSplatters[i].rotation = getRandomIntInclusive(0, 360);
      newSplatters[i].xTrans = (Math.random() - 1) * rectW;
      newSplatters[i].yTrans = (Math.random() - 1) * rectH;
    }
    //big splats
    for (let i=5; i<7; i++) {
      newSplatters[i].splatterNum = getRandomIntInclusive(8, 12);
      newSplatters[i].skewX = getRandomIntInclusive(-50, 50);
      newSplatters[i].scale = getRandomFloat(0.5, 1.2);
      newSplatters[i].skewY = getRandomIntInclusive(-50, 50);
      newSplatters[i].rotation = getRandomIntInclusive(0, 360);
      newSplatters[i].xTrans = (Math.random() - 1) * rectW;
      newSplatters[i].yTrans = (Math.random() - 1) * rectH;
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
    //console.log(roughDraftTag, newTagOpts,roughDraftTag.length, roughDraftTag.length < options.maxLength);

    const finalNewTag = {
      timeStamp: timeStamp,
      tag : roughDraftTag,
      stars : 0,
      color : '#ffffff',
    };
    //just return the finalNewTag
    return finalNewTag;
  }

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

  const onFormUpdate = values => {
    const newOptions = {opts: values.opts, addNum: values.addNum, numDigitCount: values.numDigitCount, maxLength: 20};
    setOptions(newOptions);
    makeCard();
  };

   return (
    <main>
      <div className="main-heading">
        <h1>Gamertag Brain Storm</h1>
      </div>
      <div className="main-display">
        <div className="main-display-left">
          <div className="main-display-left-display">
            {latestTag ?
              <Card /* need to switch to card */
                cardScale={1.5}
                card={cardInventory[0]}
                changeStars={changeStars}
                newTag={true}
                deleteCard={deleteCard}
                key={latestTag.timeStamp}
              />
                : ''}
            <div className="main-display-left-controls">
              {/* <input onClick={() => makeTag()} type="button" value="New Tag"/> what is new tag for?*/}
              <UserForm
                options={options}
                onUpdate={onFormUpdate}
              />
            </div>
          </div>

        </div>
        <div className="main-display-right">
          <h2>Inventory</h2>
          <section className="cardInventory"> {/* map over cards */}
            {cardInventory.map( (item) =>
              <Card
                scale={.1}
                key={item.timeStamp}
                card={item}
                changeStars={changeStars}
                deleteCard={deleteCard}
              />
              ) }
          </section>
        </div>
      </div>
    </main>
  );

};

export default App;
