import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { adjs, nouns } from './Constants';

function App() {
  const [tag, setTag] = useState("");
  const [tagInventory, setTagInventory] = useState([]); //turn into array
  const [longTag, setNewTag] = useState({
    timeStamp:'',
    tag:'stinkyBottom',
    stars: 0,
    color: '#ffffff'
  });  //doesn't need to be part of state just a place to store latest

  //need to make an array of objects for gamer tags including key as timestamp, stars, color, and stars

  const makeTag = (adjs, nouns) => {
    const randomAdjIndex = Math.floor(Math.random()*adjs.length);
    const randomNounIndex = Math.floor(Math.random()*nouns.length);
    // add stars
    // add colors
    // add timestamp
    return adjs[randomAdjIndex] + nouns[randomNounIndex];
  }

  const handleClick = () => {
    const newTag = makeTag(adjs, nouns);
    setTag(newTag);
    setNewTag({
      ...longTag,
      tag: newTag
    });
    setTagInventory([...tagInventory, newTag]);
    console.log(tagInventory);
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
