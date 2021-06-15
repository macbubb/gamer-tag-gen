import React, { useState } from 'react';
import RenderStars from './RenderStars';
import { BiExport } from 'react-icons/all';

const Welcome = (props) => {
  var popupStyle = props.welcomeState
    ? { display: 'flex' }
    : { display: 'none' };

  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage(2);
  };
  const prevPage = () => {
    setPage(1);
  };

  if (page === 1)
    return (
      <div style={popupStyle} className="welcome">
        <div className="welcome-content">
          <div className="close">
            <button
              aria-label="Close Welcome Popup"
              onClick={() => props.togglePopup(false)}
            >
              <span>&#10005;</span>
            </button>
          </div>
          <h1>Need a gamertag?</h1>
          <p>
            <strong>Gamertag Brain Tsunami</strong> will help you find the
            perfect one.
          </p>
          <h2>Get Started</h2>
          <p>
            Leave this menu by clicking <span>&#10005;</span> (
            <strong>ESC</strong>) then click the <strong>CREATE</strong> button
            (<strong>ENTER</strong>) to make a new tag. Make as many as you
            like.
          </p>
          <h2>Rate 'Em</h2>
          <p>
            Click on{' '}
            <span className="stars">
              <RenderStars deadStars={true} />
            </span>{' '}
            to rate a tag.
          </p>
          <p>
            Change your mind? You can click on the{' '}
            <span className="stars">
              <RenderStars deadStars={true} />
            </span>
            's in the inventory too.{' '}
          </p>
          <p>You can also use keys 1 - 5 to rate new tags.</p>
        </div>
        <div className="welcome-button">
          <button onClick={nextPage}>&#8594;</button>
        </div>
      </div>
    );
  else if (page === 2)
    return (
      <div style={popupStyle} className="welcome">
        <div className="welcome-content">
          <div className="close">
            <button
              aria-label="Close Welcome Popup"
              onClick={() => props.togglePopup(false)}
            >
              <span>&#10005;</span>
            </button>
          </div>
          <h2>Delete</h2>
          <p>
            Don't <em>vibe</em> with a tag? Click the <strong>&#10005;</strong>{' '}
            in the top right corner of its card.
          </p>
          <h2>Sort</h2>
          <p>
            {' '}
            Click <strong>SORT</strong> (<strong>S</strong> key) to list your
            tags from high to low.
          </p>
          <h2>Pick Yo Paint</h2>
          <p>
            Use the toggle switch to choose between black, red, and
            multi-colored paint splatters.
          </p>
          <h2>Share</h2>
          <p>
            Each tag has a share button (
            <BiExport className="welcome-page-icon" />) where you can copy to
            your clipboard, tweet, or post to facebook.
          </p>
        </div>
        <div className="welcome-button">
          <button onClick={() => prevPage()}>←</button>
        </div>
      </div>
    );
};

export default Welcome;
