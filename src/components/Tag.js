import React from 'react';
import RenderStars from './RenderStars';

class Tag extends React.Component {
    render() {
      const item = this.props.tagItem;
      const stars = this.props.tagItem.stars;
      const changeStars = this.props.changeStars;
      const deleteTag = this.props.deleteTag;
      const tagClass = this.props.newTag ? "tag-item new-item" : "tag-item";
      // use extra class for the top tag so it can be styled differently than inventory tags

      return (
        <div className={tagClass}>
          <div className="tag-item-top">
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

  export default Tag;