import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { adjs, nouns } from './Constants';
import { Formik, Field, Form } from 'formik';


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

class Tag extends React.Component {
  render() {
    const item = this.props.tagItem;
    const stars = this.props.tagItem.stars;
    const changeStars = this.props.changeStars;
    const deleteTag = this.props.deleteTag;
    const tagClass = this.props.newTag ? "tag-item new-item" : "tag-item";
    // use extra class for the top tag so it can be styled differently than inventory tags

    return (
      <div className={tagClass}>
        <div className="tag-item-top">
          <span className="tag-item-name" >{item.tag}</span>
          <button className="delete-tag" onClick={() => deleteTag(item.timeStamp)}><span>&#10006;</span></button>
        </div>
          <RenderStars
            stars={stars}
            changeStars={changeStars}
            newTag={false}
            item={item}
            key={item.key}
          />
      </div>
    );
  }
}

// ref for using symbol tag https://css-tricks.com/svg-symbol-good-choice-icons/

const RenderStars = (props) => {
    const display = {display: "none"}; //style attribute in JSX needs to be loaded as a variable, can't use as a string
    const whichStar = [1,2,3,4,5]; //this is used in for loop and ternary to pass star rating to changeStars
    const starcode = []; // will contain JSX of star ratings

    //spits out JSX for 5 stars filled or empty depending on rating
    for (const [index] of whichStar.entries()) {
    (index < props.stars) ? starcode.push(
      <svg className="filled-star" onClick={() => props.changeStars(index + 1, props.item.timeStamp)}>
        <use xlinkHref="#filled-star" />
      </svg>
    ) : starcode.push(
        <svg className="empty-star" onClick={() => props.changeStars(index + 1, props.item.timeStamp)}>
          <use xlinkHref="#empty-star" />
        </svg>
    )
  }
  return (
    <div className="stars">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={display}>
        <symbol id="filled-star" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </symbol>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={display}>
        <symbol id="empty-star" viewBox="0 0 24 24">
          <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/>
        </symbol>
        </svg>
      {starcode}
    </div>
  );
};

export default App;
