import React, { useRef, useEffect } from 'react';
import RenderStars from './RenderStars';

function useOutsideAlerter(ref, togglePopup) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        togglePopup(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const Welcome = (props) => {
  const wrapperRef = useRef(null);
  var popupStyle = props.welcomeState
    ? { display: 'block' }
    : { display: 'none' };
  useOutsideAlerter(wrapperRef, props.togglePopup);

  return (
    <div style={popupStyle} ref={wrapperRef} className="welcome">
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
        <strong>Gamertag Brain Tsunami</strong> will help you find the perfect
        one.
      </p>
      <h2>Get Started</h2>
      <p>
        Press the <strong>CREATE</strong> button to make a new tag. Make as many
        as you like.
      </p>
      <h2>Rate, Delete, & Sort</h2>
      <p>
        Click on{' '}
        <span className="stars">
          <RenderStars deadStars={true} />
        </span>{' '}
        to rate the tag.
      </p>
      <p>
        Change your mind? You can click on the{' '}
        <span className="stars">
          <RenderStars deadStars={true} />
        </span>
        's in the inventory too.{' '}
      </p>
      <p>
        Don't <em>vibe</em> with a tag? Click the <strong>&#10005;</strong> in
        the top right corner of its card.
      </p>
      <p>
        {' '}
        Click <strong>SORT</strong> to list your tags from high to low.
      </p>
      <h2>Pick Yo Paint</h2>
      <p>
        Use the toggle switch to choose between black, red, and multi-colored
        paint splatters.
      </p>
    </div>
  );
};

export default Welcome;
