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
      const {rectW, rectH, framePadding} = this.props.cardDimensions;
      const frameCorners = () => {
        const topLeft = [cardScale*(framePadding + frameOffset[0][0]),
                          cardScale*(framePadding + frameOffset[0][1])];
        const topRight = [cardScale*(rectW - framePadding + frameOffset[1][0]),
                          cardScale*(framePadding + frameOffset[1][1])];
        const bottomRight = [cardScale*(rectW - framePadding + frameOffset[2][0]),
                            cardScale*(rectH - framePadding + frameOffset[2][1])];
        const bottomLeft = [cardScale*(framePadding + frameOffset[3][0]),
                            cardScale*(rectH - framePadding + frameOffset[3][1])];
        const allFourCorners = {
            topLeft: topLeft,
            topRight: topRight,
            bottomRight: bottomRight,
            bottomLeft: bottomLeft
          }
        return allFourCorners;
      }

      const cardSizeStyle = {
        width : cardScale * rectW + 'px',
        height: cardScale * rectH + 'px'
      }

      let cardSplattersStyle = {
        transform: 'translateX(' + (cardScale * rectW) / 3.5 + 'px ) translateY(' + (cardScale * rectH) /5 + 'px )'
      }
      if (cardScale !== 1 ) {cardSplattersStyle = {
        transform: 'translateX(' + (cardScale * rectW) / 2.5 + 'px ) translateY(' + (cardScale * rectH) / 3 + 'px )'
        }
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
          <div className="card-splatters" style={cardSplattersStyle}>
            {splatters ? splatters.map( (splatter) => {
              return <RenderSplatters
                splatter = {splatter}
                cardScale = {cardScale}
              />
            }) : ''}
          </div>
          {frameOffset[0] ?
            <RenderCardFrame
              frameCorners = {frameCorners()}
              cardScale = {cardScale}
            />
            : ''
          }
          <div className="card-info"> {/* look into CSS and making styles uniform and scalable with scale property */}
            <span className="card-info-name" >{item.tag}</span>
            <div className="delete-card">
              <button aria-label="Delete Card" onClick={() => deleteCard(item.timeStamp)}><span>&#10005;</span></button>
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