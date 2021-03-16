import React, { useState, useEffect, useRef } from 'react';
import { adjs, nouns } from '../Constants';
import { Formik, Field, Form } from 'formik';
import '../App.css';
import Tag from './Tag';
import UserForm from './UserForm';

function App() {
  const [tagInventory, setTagInventory] = useState([{
    timeStamp: '',
    tag:'',
    stars:0,
    color:'#fffff'
  }]);

  // keeps track of most recent tag, and is null if no tag has been generated, used to conditionally render the top tag, without testing it can't get called
  const latestTag = tagInventory[tagInventory.length - 1] ? tagInventory[tagInventory.length -1] : null;

  const handleAdd = (tag) => {
    setTagInventory([ tag, ...tagInventory ]);
  }

  const [options, setOptions] = useState({opts: 'bothCaps', addNum: false, numDigitCount:1 , maxLength: 20});

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
    console.log(roughDraftTag, newTagOpts,roughDraftTag.length, roughDraftTag.length < options.maxLength);

    const finalNewTag = {
      timeStamp: timeStamp,
      tag : roughDraftTag,
      stars : 0,
      color : '#ffffff',
    };
    handleAdd(finalNewTag);
  }

  function changeStars(stars, key) {
    const newRatingInventory = tagInventory.map(obj => obj.timeStamp === key ? { ...obj, stars } : obj);

    setTagInventory(newRatingInventory);
  }

  function deleteTag(key) {
    // use filter to make a copy without tag that's been deleted
    const newRatingInventory = tagInventory.filter(obj => obj.timeStamp !== key);
    console.log(key, newRatingInventory);
    setTagInventory(newRatingInventory);
  }

  const onFormUpdate = values => {
    const newOptions = {opts: values.opts, addNum: values.addNum, numDigitCount: values.numDigitCount, maxLength: values.maxLength};
    setOptions(newOptions);
    makeTag();
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
              <Tag
                tagItem={tagInventory[0]}
                changeStars={changeStars}
                newTag={true}
                deleteTag={deleteTag}
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
          <section className="tagInventory">
            {tagInventory.map( (item) =>
              <Tag
                key={item.timeStamp}
                tagItem={item}
                changeStars={changeStars}
                deleteTag={deleteTag}
              />
              ) }
          </section>
        </div>
      </div>
     </main>
  );

};

export default App;
