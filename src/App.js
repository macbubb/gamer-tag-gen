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

 // need component to render tags

  return (
    <main>
      <h1>Gamer Tag Brain Storm Factory</h1>
      <div className="main-display">
        <div className="main-display-left">
          <div className="main-display-left-controls">
            {latestTag ? <Tag tagItem={latestTag} /> : ''}
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

    return (
      <div className="tagItem" >

        <span className="tagItemName" >{item.tag}</span>
      </div>
    );
  }
}

export default App;
