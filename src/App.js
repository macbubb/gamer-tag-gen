import './App.css';
import React, { useState } from 'react';
import { adjs, nouns } from './Constants';

function App() {
  const [tagInventory, setTagInventory] = useState([]);

  const latestTag = tagInventory[tagInventory.length -1] ? tagInventory[tagInventory.length -1]: null;

  const handleAdd = (tag) => {
    setTagInventory([...tagInventory, tag]);
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

  const changeStars = (stars, key) => {
    console.log("1 star");
/*     const newRatingInventory = { ...tagInventory};

    newRatingInventory[key].stars = stars;
    setTagInventory([...newRatingInventory]); */
  };

  return (
    <main>
      <h1>Gamer Tag Brain Storm Factory</h1>
      <div className="main-display">
        <div className="main-display-left">
          <div className="main-display-left-controls">
            {latestTag ?
              <Tag
                tagItem={latestTag}
                changeStars ={changeStars}
              />
                : ''}
            <button onClick={() => makeTag()}>New Tag</button>
          </div>
        </div>

        <div className="main-display-right">
          <section className="tagInventory">
            {tagInventory.map( (item) => <Tag key={item.timeStamp} tagItem={item}/>) }
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
    return (
      <div className="tagItem" >

        <span className="tagItemName" >{item.tag}</span>
          <RenderStars
            stars={stars}
            key={key}
            changeStars={this.props.changeStars}
          />
      </div>
    );
  }
}
const RenderStars = (props) => {
    const display = {display: "none"}; //style attribute in JSX needs to be loaded as a variable, can't use as a string

  return (
    <div>
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
          <svg className="empty-star" onClick={() => props.changeStars(1, props.key)}>
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
