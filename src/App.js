import './App.css';
import React, { useState } from 'react';
import { adjs, nouns } from './Constants';

function App() {
  const [tagInventory, setTagInventory] = useState([]);

  const handleAdd = (tag) => {
    setTagInventory([...tagInventory, tag]);
  }

  // function for picking color

  const makeTag = () => {
    const randomAdjIndex = Math.floor(Math.random()*adjs.length);
    const randomNounIndex = Math.floor(Math.random()*nouns.length);
    var timeStamp = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    const newTag = {
      timeStamp: timeStamp,
      tag : adjs[randomAdjIndex] + nouns[randomNounIndex],
      stars : 0,
      color : '#ffffff',
    };
    handleAdd(newTag);
    console.log(newTag);
  }

 // need method to render tag inventory

  return (
    <main>
      <h1>Gamer Tag Brain Storm Factory</h1>
      <div class="flexIt">
      <div class="left">
        <h2></h2>
        <button onClick={() => makeTag()}>New Tag</button>
      </div>
      <div class="right">
        <ol>
          {tagInventory.map( (item) => <li key={item.timeStamp}>{item.tag} </li>) }
        </ol>
      </div>
      </div>
    </main>
  );

};

export default App;
