import './App.css';
import React, { useState } from 'react';
import { adjs, nouns } from './Constants';

function App() {
  const [tagInventory, setTagInventory] = useState([]);

  // keeps track of most recent tag, and is null if no tag has been generated, used to conditionally render the top tag, without testing it can't get called
  const latestTag = tagInventory[tagInventory.length - 1] ? tagInventory[tagInventory.length -1] : null;

  const handleAdd = (tag) => {
    setTagInventory([ tag, ...tagInventory]);
  }

  // function for picking color

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
    console.log(newTag);
  }

  function changeStars(stars) {
    console.log(stars);
    const newRatingInventory = [ ...tagInventory];

    //newRatingInventory[key].stars = stars;
    setTagInventory([...newRatingInventory]);
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
                tagItem={latestTag}
                changeStars={changeStars}
                newTag={true}
                key={latestTag.timeStamp}
              />
                : ''}
            <div className="main-display-left-controls-generate-tag">
              <button onClick={() => makeTag()}>New Tag</button>
            </div>
          </div>
          <div className="main-display-left-options">
            <h2>Options</h2>
            <div className="checkbox">
              <input className="" type="checkbox" id="add-number" name="add-number"></input>
              <label htmlFor="add-number">Add a number</label>
            </div>
            <div className="checkbox">
              <input className="no-caps" type="checkbox" id="no-caps" name="no-caps"></input>
              <label htmlFor="no-caps">No caps</label>
            </div>
            <div className="checkbox">
              <input className="all-caps" type="checkbox" id="all-caps" name="all-caps"></input>
              <label htmlFor="all-caps">All caps</label>
            </div>
            <div className="checkbox">
              <input className="only-front-cap" type="checkbox" id="only-front-cap" name="only-front-cap"></input>
              <label htmlFor="only-front-cap">Capitalize first letter only</label>
            </div>
 {/*            <div className="checkbox">
              <input className="" type="checkbox" id="" name=""></input>
              <label htmlFor=""></label>
            </div> */}
          </div>
        </div>

        <div className="main-display-right">
          <h2>Inventory</h2>
          <section className="tagInventory">
            {tagInventory.map( (item) =>
              <Tag
                key={item.timeStamp}
                tagItem={item}
              />
              ) }
          </section>
        </div>
      </div>
    </main>
  );

};

class Tag extends React.Component {
  render() {
    const item = this.props.tagItem;
    const stars = this.props.tagItem.stars;
    const key = this.props.tagItem.timeStamp;
    const tagClass = this.props.newTag ? "tag-item new-item" : "tag-item";
    // use extra class for the top tag so it can be styled differently than inventory tags

    return (
      <div className={tagClass}>
        <div className="tag-item-top">
          <span className="tag-item-name" >{item.tag}</span>
          <a href="#main"><span className="delete-tag">&#10006;</span></a>
        </div>
          <RenderStars
            stars={stars}
            changeStars={this.props.changeStars}
            newTag={false}
          />
      </div>
    );
  }
}
const RenderStars = (props) => {
    const display = {display: "none"}; //style attribute in JSX needs to be loaded as a variable, can't use as a string
  // ref for using symbol tag https://css-tricks.com/svg-symbol-good-choice-icons/
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
         {/* zero stars */}
      {props.stars === 0 &&
        <div>
          <svg className="empty-star" onClick={() => props.changeStars(4)}>
          <use xlinkHref="#empty-star" />
        </svg>
        <svg className="empty-star">
          <use xlinkHref="#empty-star" />
        </svg>
        <svg className="empty-star">
          <use xlinkHref="#empty-star" />
        </svg>
        <svg className="empty-star">
          <use xlinkHref="#empty-star" />
        </svg>
        <svg className="empty-star">
          <use xlinkHref="#empty-star" />
        </svg>
        </div>
      }
    </div>
  );
};


export default App;
