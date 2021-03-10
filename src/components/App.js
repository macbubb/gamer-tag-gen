import React, { useState, useEffect, useRef } from 'react';
import { adjs, nouns } from '../Constants';
import { Formik, Field, Form } from 'formik';
import '../App.css';
import Tag from './Tag';

function App() {
  const [tagInventory, setTagInventory] = useState([]);

  // keeps track of most recent tag, and is null if no tag has been generated, used to conditionally render the top tag, without testing it can't get called
  const latestTag = tagInventory[tagInventory.length - 1] ? tagInventory[tagInventory.length -1] : null;

  const handleAdd = (tag) => {
    setTagInventory([ tag, ...tagInventory ]);
  }

  const makeTag = () => {
    const randomAdjIndex = Math.floor(Math.random()*adjs.length);
    const randomNounIndex = Math.floor(Math.random()*nouns.length);
    var timeStamp = Date.now();
    const newTag = {
      timeStamp: timeStamp,
      tag : adjs[randomAdjIndex] + nouns[randomNounIndex],
      stars : 0,
      color : '#ffffff',
    };
    handleAdd(newTag);
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

  return (
    <main>
      <div className="main-heading">
        <h1>Gamertag Brain Storm</h1>
      </div>
      <div className="main-display">
        <div className="main-display-left">
          <div className="main-display-left-controls">
            {latestTag ?
              <Tag
                tagItem={tagInventory[0]}
                changeStars={changeStars}
                newTag={true}
                deleteTag={deleteTag}
                key={latestTag.timeStamp}
              />
                : ''}
            <div className="main-display-left-controls-generate-tag">
              <input onClick={() => makeTag()} type="button" value="New Tag"/>
            </div>
          </div>
          <div  className="main-display-left-options">
            <h2>Options</h2>
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
      </div>
     </main>
  );

};



// ref for using symbol tag https://css-tricks.com/svg-symbol-good-choice-icons/



export default App;
