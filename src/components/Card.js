import React from 'react';
import RenderSplatters from './RenderSplatters';
import RenderStars from './RenderStars';
//will change to Card will render splattes with separate function and overlay tags and interface
class Card extends React.Component {
    render() {
      const item = this.props.tagItem;
      const stars = this.props.tagItem.stars;
      const changeStars = this.props.changeStars;
      const deleteTag = this.props.deleteTag;
      const tagClass = this.props.newTag ? "tag-item new-item" : "tag-item";
      const splatters = this.props.splatters;
      const cardScale = this.props.cardScale;
      // use extra class for the top tag so it can be styled differently than inventory tags

      return (
        <div className={tagClass}>
          <div className="splatters">
            {splatters.map( (splatter) => {
              <RenderSplatters
                splatter = {splatter}
                cardScale = {cardScale}
              />
            })}
          </div>
          <div className="tag-item-top"> {/* look into CSS and making styles uniform and scalable with scale property */}
            <span className="tag-item-name" >{item.tag}</span>
            <button className="delete-tag" onClick={() => deleteTag(item.timeStamp)}><span>&#10006;</span></button>
          </div>
            <RenderStars
              stars={stars}
              changeStars={changeStars}
              newTag={false}
              item={item}
              key={item.key}
            />
        </div>
      );
    }
  }

  export default Card;