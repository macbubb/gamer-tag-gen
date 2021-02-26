import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { adjs, nouns } from './Constants';

function App() {
  const [tag, setTag] = useState("");
  const [tagInventory, setTagInventory] = useState([]); //add objects to array
  const tempTag = {
    timeStamp:'',
    tag:'',
    stars:'',
    color: ''
  };  //doesn't need to be part of state just a place to store latest

  //need to make an array of objects for gamer tags including key as timestamp, stars, color, and stars

  const makeTag = (adjs, nouns) => {
    const randomAdjIndex = Math.floor(Math.random()*adjs.length);
    const randomNounIndex = Math.floor(Math.random()*nouns.length);
    const stars = 0;
    const color = '#ffffff';
    var timeStamp = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    const tag = adjs[randomAdjIndex] + nouns[randomNounIndex];
    return { timeStamp, tag, stars, color };
  }

  const handleClick = () => {
    tempTag = {...makeTag(adjs, nouns)};
    //setTag(newTag);
    /*setNewTag({
      ...longTag,
      tag: newTag
    });*/
    //setTagInventory([...tagInventory, newTag]);
    console.log(tempTag);
  }

  //setNewTag({...newTag, tag: 'stinkyBottom'});

// need method to render tag inventory

  return (
    <main>
      <h1>Gamer Tag Brain Storm Factory</h1>
      <div class="flexIt">
      <div class="left">
        <h2>{tag}</h2>
        <button onClick={() => handleClick()}>New Tag</button>
      </div>
      <div class="right">
        <ol>
          {tagInventory.map( (item) => <li>{item} </li>) }
        </ol>
      </div>
      </div>
    </main>
  );

};

export default App;
