import React, { useState } from 'react';
import RenderSplatters from './RenderSplatters';
import RenderStars from './RenderStars';
import RenderCardFrame from './RenderCardFrame';
import Export from './Export';

//will change to Card will render splattes with separate function and overlay tags and interface
const Card = (props) => {
  const { card, changeStars, deleteCard, cardScale, palette } = props;
  const { stars, splatters, frameOffset } = props.card;
  const cardClass = props.newTag
    ? 'card new-card ' + card.tag
    : 'card ' + card.tag;
  const { rectW, rectH, originOffset } = props.cardDimensions;
  const [showExportMenu, toggleExportMenu] = useState({ display: 'none' });
  const frameCorners = () => {
    const topLeft = [
      cardScale * (originOffset[0] + frameOffset[0][0]),
      cardScale * (originOffset[1] + frameOffset[0][1]),
    ];
    const topRight = [
      cardScale * (originOffset[0] + rectW + frameOffset[1][0]),
      cardScale * (originOffset[1] + frameOffset[1][1]),
    ];
    const bottomRight = [
      cardScale * (originOffset[0] + rectW + frameOffset[2][0]),
      cardScale * (originOffset[1] + rectH + frameOffset[2][1]),
    ];
    const bottomLeft = [
      cardScale * (originOffset[0] + frameOffset[3][0]),
      cardScale * (originOffset[1] + rectH + frameOffset[3][1]),
    ];
    return { topLeft, topRight, bottomRight, bottomLeft };
  };

  const cardSizeStyle = {
    width: cardScale * rectW + 'px',
    height: cardScale * rectH + 'px',
  };

  const [exportIconColor, setExportIconColor] = useState('#d9d9d9');

  const handleMouseEnter = () => {
    const darkExportIconColor = '#666666';
    setExportIconColor(darkExportIconColor);
  };

  const handleMouseLeave = () => {
    setExportIconColor('#d9d9d9');
    toggleExportMenu({ display: 'none' });
  };

  let cardSplattersStyle =
    cardScale !== 1
      ? {
          margin: '2rem 0 0 4.5rem',
          position: 'absolute',
        }
      : {
          margin: '-1rem 0 0 1rem',
          position: 'absolute',
        };

  //card element order, first rendered to last
  //1. splatters (small then big?)
  //2. polygon frame
  //3. name
  //4. x
  //5. stars

  // use extra class for the top card so it can be styled differently than inventory cards
  return (
    <div
      className={cardClass}
      style={cardSizeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-graphics">
        <div className="card-splatters" style={cardSplattersStyle}>
          {splatters
            ? splatters.map((splatter) => {
                return (
                  <RenderSplatters
                    key={splatter.key}
                    splatter={splatter}
                    cardScale={cardScale}
                    palette={palette}
                  />
                );
              })
            : ''}
        </div>
        <div className="card-frame">
          {frameOffset[0] ? (
            <RenderCardFrame
              frameCorners={frameCorners()}
              cardScale={cardScale}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="card-info">
        {' '}
        {/* look into CSS and making styles uniform and scalable with scale property */}
        <div data-html2canvas-ignore className="card-info-buttons">
          <div className="export-card">
            <Export
              showExportMenu={showExportMenu}
              toggleExportMenu={toggleExportMenu}
              exportIconColor={exportIconColor}
              card={card}
              cardScale={2}
              palette={palette}
              cardDimensions={props.cardDimensions}
              changeStars={changeStars}
              newTag={true}
              deleteCard={deleteCard}
            />
          </div>
          <div className="delete-card">
            <button
              aria-label="Delete Card"
              onClick={() => deleteCard(card.timeStamp)}
            >
              <span>&#10005;</span>
            </button>
          </div>
        </div>
        <div className="card-info-name">
          <span>{card.tag}</span>
        </div>
        <div className="stars">
          <RenderStars
            stars={stars}
            changeStars={changeStars}
            newTag={false}
            card={card}
            deadStars={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
