import React from 'react';

// ref for using symbol tag https://css-tricks.com/svg-symbol-good-choice-icons/

const RenderStars = (props) => {
    const display = {display: "none"}; //style attribute in JSX needs to be loaded as a variable, can't use as a string
    const whichStar = [1,2,3,4,5]; //this is used in for loop and ternary to pass star rating to changeStars
    const starcode = []; // will contain JSX of star ratings

    //spits out JSX for 5 stars filled or empty depending on rating
    for (const [index] of whichStar.entries()) {
    (index < props.stars) ? starcode.push(
      <svg className="filled-star" key={index} onClick={() => props.changeStars(index + 1, props.item.timeStamp)}>
        <use xlinkHref="#filled-star" />
      </svg>
    ) : starcode.push(
        <svg className="empty-star" key={index} onClick={() => props.changeStars(index + 1, props.item.timeStamp)}>
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

export default RenderStars;