import React from 'react';
import RenderSplatters from './RenderSplatters';
import RenderStars from './RenderStars';
import RenderCardFrame from './RenderCardFrame';
//will change to Card will render splattes with separate function and overlay tags and interface
class Card extends React.Component {
    render() {
      const item = this.props.card;
      const stars = this.props.card.stars;
      const changeStars = this.props.changeStars;
      const deleteCard = this.props.deleteCard;
      const cardClass = this.props.newTag ? "card new-card" : "card";
      const splatters = this.props.card.splatters;
      const cardScale = this.props.cardScale;
      const frameOffset = this.props.card.frameOffset;
      const {rectW, rectH, originOffset} = this.props.cardDimensions;
      const palette = this.props.palette;
      const frameCorners = () => {
        const topLeft = [cardScale*(originOffset[0] + frameOffset[0][0]),
                          cardScale*(originOffset[1] + frameOffset[0][1])];
        const topRight = [cardScale*(originOffset[0] + rectW + frameOffset[1][0]),
                          cardScale*(originOffset[1] + frameOffset[1][1])];
        const bottomRight = [cardScale*(originOffset[0] + rectW + frameOffset[2][0]),
                            cardScale*(originOffset[1] + rectH + frameOffset[2][1])];
        const bottomLeft = [cardScale*(originOffset[0] + frameOffset[3][0]),
                            cardScale*(originOffset[1] + rectH + frameOffset[3][1])];
        return { topLeft, topRight, bottomRight, bottomLeft }
      }

      const cardSizeStyle = {
        width : cardScale * rectW + 'px',
        height: cardScale * rectH + 'px'
      }

      let cardSplattersStyle = cardScale !== 1 ? {
        margin: '2rem 0 0 4.5rem',
        position: 'absolute'
      } :
      {
        margin: '-1rem 0 0 1rem',
        position: 'absolute'
        }

      //card element order, first rendered to last
      //1. splatters (small then big?)
      //2. polygon frame
      //3. name
      //4. x
      //5. stars

      // use extra class for the top card so it can be styled differently than inventory cards
      return (
        <div className={cardClass} style={cardSizeStyle}>
          <div className="card-graphics">
            <div className="card-splatters" style={cardSplattersStyle}>
                {splatters ? splatters.map( (splatter) => {
                  return <RenderSplatters
                    splatter = {splatter}
                    cardScale = {cardScale}
                    palette = {palette}
                    />
                }) : ''}
              </div>
              <div className="card-frame">
                {frameOffset[0] ?
                    <RenderCardFrame
                      frameCorners = {frameCorners()}
                      cardScale = {cardScale}
                    />
                    : ''
                  }
              </div>
            </div>
          <div className="card-info"> {/* look into CSS and making styles uniform and scalable with scale property */}
            <div className="delete-card">
              <button aria-label="Delete Card" onClick={() => deleteCard(item.timeStamp)}><span>&#10005;</span></button>
            </div>
            <div className="card-info-name" >
              <span>{item.tag}</span>
            </div>
            <RenderStars
              stars={stars}
              changeStars={changeStars}
              newTag={false}
              item={item}
              key={item.key}
              />
            </div>
        </div>
      );
    }
  }

  export default Card;